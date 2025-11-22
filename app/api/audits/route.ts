import { type NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/src/lib/mongodb";
import { AuditLogModel } from "@/src/models/Audit";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const search = searchParams.get('search') || '';
    const entity = searchParams.get('entity') || '';
    const action = searchParams.get('action') || '';
    const startDate = searchParams.get('startDate') || '';
    const endDate = searchParams.get('endDate') || '';
    const format = searchParams.get('format') || 'json';

    const filter: any = {};

    if (search) {
      filter.$or = [
        { userId: new RegExp(search, 'i') },
        { entityId: new RegExp(search, 'i') }
      ];
    }

    if (entity) {
      filter.entity = entity;
    }

    if (action) {
      filter.action = action;
    }

    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) {
        filter.createdAt.$gte = new Date(startDate);
      }
      if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        filter.createdAt.$lte = end;
      }
    }

    const skip = (page - 1) * limit;

    const total = await AuditLogModel.countDocuments(filter);
    const audits = await AuditLogModel.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    if (format === 'csv') {
      const csvHeader = 'User ID,Action,Entity,Entity ID,Timestamp,Details\n';
      const csvRows = audits.map(log => {
        const details = JSON.stringify(log.meta || {}).replace(/"/g, '""');
        return `"${log.userId}","${log.action}","${log.entity}","${log.entityId}","${new Date(log.createdAt).toISOString()}","${details}"`;
      });
      const csv = csvHeader + csvRows.join('\n');

      return new NextResponse(csv, {
        status: 200,
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': 'attachment; filename="audit-logs.csv"'
        }
      });
    }

    return NextResponse.json({
      audits,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error("Error fetching audits:", error);
    return NextResponse.json({ error: "Failed to fetch audits" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await connectDB();

    const searchParams = request.nextUrl.searchParams;
    const days = parseInt(searchParams.get('days') || '30');

    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    const result = await AuditLogModel.deleteMany({
      createdAt: { $lt: cutoffDate }
    });

    return NextResponse.json({
      message: `Deleted ${result.deletedCount} audit logs older than ${days} days`
    });
  } catch (error) {
    console.error("Error deleting audit logs:", error);
    return NextResponse.json({ error: "Failed to delete audit logs" }, { status: 500 });
  }
}
