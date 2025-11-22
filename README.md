# API Endpoint Specifications

This document provides the specifications for the API endpoints to be used by the front-end team.

## Bookings

### `GET /api/bookings`

*   **Description:** Retrieves all bookings.
*   **Response:**
    *   `200 OK`: A JSON object containing an array of booking objects.
    *   `500 Internal Server Error`: If there is an error fetching the bookings.

```json
{
  "bookings": [
    {
      "id": "string",
      "user": "string",
      "room": "string",
      "startTime": "date",
      "endTime": "date"
    }
  ]
}
```

### `POST /api/bookings`

*   **Description:** Creates a new booking.
*   **Request Body:** A JSON object representing the new booking.

```json
{
  "user": "string",
  "room": "string",
  "startTime": "date",
  "endTime": "date"
}
```

*   **Response:**
    *   `201 Created`: A JSON object of the created booking.
    *   `500 Internal Server Error`: If there is an error creating the booking.

## Devices

### `GET /api/devices`

*   **Description:** Retrieves all devices.
*   **Response:**
    *   `200 OK`: A JSON object containing an array of device objects.
    *   `500 Internal Server Error`: If there is an error fetching the devices.

```json
{
  "devices": [
    {
      "id": "string",
      "name": "string",
      "type": "string",
      "status": "string",
      "room": "string"
    }
  ]
}
```

### `POST /api/devices`

*   **Description:** Creates a new device.
*   **Request Body:** A JSON object representing the new device.

```json
{
  "name": "string",
  "type": "string",
  "status": "string",
  "room": "string"
}
```

*   **Response:**
    *   `201 Created`: A JSON object of the created device.
    *   `500 Internal Server Error`: If there is an error creating the device.

## Health

### `GET /api/health`

*   **Description:** Checks the health of the API.
*   **Response:**
    *   `200 OK`: A JSON object with the status and timestamp.

```json
{
  "status": "ok",
  "timestamp": "date"
}
```

## Notifications

### `GET /api/notifications`

*   **Description:** Retrieves all notifications.
*   **Response:**
    *   `200 OK`: A JSON object containing an array of notification objects.
    *   `500 Internal Server Error`: If there is an error fetching the notifications.

```json
{
  "notifications": [
    {
      "id": "string",
      "user": "string",
      "message": "string",
      "read": "boolean"
    }
  ]
}
```

### `POST /api/notifications`

*   **Description:** Creates a new notification.
*   **Request Body:** A JSON object representing the new notification.

```json
{
  "user": "string",
  "message": "string"
}
```

*   **Response:**
    *   `201 Created`: A JSON object of the created notification.
    *   `500 Internal Server Error`: If there is an error creating the notification.

## Rooms

### `GET /api/rooms`

*   **Description:** Retrieves all rooms.
*   **Response:**
    *   `200 OK`: A JSON object containing an array of room objects.
    *   `500 Internal Server Error`: If there is an error fetching the rooms.

```json
{
  "rooms": [
    {
      "id": "string",
      "name": "string",
      "capacity": "number",
      "amenities": ["string"]
    }
  ]
}
```

### `POST /api/rooms`

*   **Description:** Creates a new room.
*   **Request Body:** A JSON object representing the new room.

```json
{
  "name": "string",
  "capacity": "number",
  "amenities": ["string"]
}
```

*   **Response:**
    *   `201 Created`: A JSON object of the created room.
    *   `500 Internal Server Error`: If there is an error creating the room.
}
