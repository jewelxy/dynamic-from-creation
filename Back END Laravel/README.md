# FromFieldController API Documentation

## Overview

The `FromFieldController` handles the CRUD operations for the `FromField` model. This controller provides endpoints to list, create, update, show, and delete `FromField` records.

## Endpoints

### List All FromFields

**URL:** `/api/from-fields`  
**Method:** `GET`  
**Description:** Retrieve a list of all `FromField` records.

**Response:**
```
[
    {
        "id": 1,
        "tracking_id": "20240101010101",
        "name": "Field Name",
        "field_type_id": 1,
        "is_required": true,
        "readonly": false,
        "createdby": 1,
        "updatedby": 1,
        "created_at": "2024-01-01T00:00:00.000000Z",
        "updated_at": "2024-01-01T00:00:00.000000Z",
        "field_type": {
            "id": 1,
            "name": "text"
        }
    },
    ...
]
```


### Show a FromField

**URL:** `/api/from-fields/{id}`  
**Method:** `GET`  
**Description:** Retrieve a specific `FromField` record by its ID.

**Response:**
```json
{
    "id": 1,
    "tracking_id": "20240101010101",
    "name": "Field Name",
    "field_type_id": 1,
    "is_required": true,
    "readonly": false,
    "createdby": 1,
    "updatedby": 1,
    "created_at": "2024-01-01T00:00:00.000000Z",
    "updated_at": "2024-01-01T00:00:00.000000Z",
    "field_type": {
        "id": 1,
        "name": "text"
    }
}
```

### Create a FromField

**URL:** `/api/from-fields`  
**Method:** `POST`  
**Description:** Create a new `FromField` record.

**Request Body:**
```json
[
    {
        "field_type_id": 1,
        "name": "Field Name",
        "is_required": true,
        "readonly": false
    },
    ...
]
```

**Response:**
```json
{
    "message": "Fields saved successfully"
}
```

### Update a FromField

**URL:** `/api/from-fields/{id}`  
**Method:** `PUT`  
**Description:** Update an existing `FromField` record by its ID.

**Request Body:**
```json
{
    "field_type_id": 1,
    "name": "Updated Field Name",
    "is_required": true,
    "readonly": false
}
```

**Response:**
```json
{
    "message": "Field updated successfully"
}
```

### Delete a FromField

**URL:** `/api/from-fields/{id}`  
**Method:** `DELETE`  
**Description:** Delete a specific `FromField` record by its ID.

**Response:**
```json
{
    "message": "Field deleted successfully"
}
```

## Error Handling

In case of errors, the API will return a JSON response with an appropriate error message and HTTP status code.

**Example Error Response:**
```json
{
    "message": "An error occurred while saving the fields."
}
```

## Logging

The `FromFieldController` logs request data, validated data, and any errors that occur during the execution of its methods.

## Transactions

The `store`, `update`, and `destroy` methods use database transactions to ensure data integrity. If an error occurs, the transaction is rolled back.

## Validation

The `store` and `update` methods validate the request data before performing any operations. The validation rules ensure that the required fields are present and have the correct data types.


# Customers API Documentation

## Overview

The `CustomersController` handles the CRUD operations for the `Customer` model. This controller provides endpoints to list, create, update, show, and delete `Customer` records.

## Endpoints

### List All Customers

**URL:** `/api/customers`  
**Method:** `GET`  
**Description:** Retrieve a list of all `Customer` records.

**Response:**
```json
[
    {
        "id": 1,
        "tracking_id": "20240101010101",
        "value": "Customer Value",
        "from_field_id": 1,
        "createdby": 1,
        "updatedby": 1,
        "created_at": "2024-01-01T00:00:00.000000Z",
        "updated_at": "2024-01-01T00:00:00.000000Z",
        "from_field": {
            "id": 1,
            "name": "Field Name"
        }
    },
    ...
]
```

### Show a Customer

**URL:** `/api/customers/{id}`  
**Method:** `GET`  
**Description:** Retrieve a specific `Customer` record by its ID.

**Response:**
```json
{
    "id": 1,
    "tracking_id": "20240101010101",
    "value": "Customer Value",
    "from_field_id": 1,
    "createdby": 1,
    "updatedby": 1,
    "created_at": "2024-01-01T00:00:00.000000Z",
    "updated_at": "2024-01-01T00:00:00.000000Z",
    "from_field": {
        "id": 1,
        "name": "Field Name"
    }
}
```

### Create a Customer

**URL:** `/api/customers`  
**Method:** `POST`  
**Description:** Create a new `Customer` record.

**Request Body:**
```json
[
    {
        "value": "Customer Value",
        "from_field_id": 1,
        "createdby": 1,
        "updatedby": 1
    },
    ...
]
```

**Response:**
```json
{
    "message": "Customers info created successfully"
}
```

### Update a Customer

**URL:** `/api/customers/{id}`  
**Method:** `PUT`  
**Description:** Update an existing `Customer` record by its ID.

**Request Body:**
```json
{
    "value": "Updated Customer Value",
    "from_field_id": 1,
    "createdby": 1,
    "updatedby": 1
}
```

**Response:**
```json
{
    "message": "Customer info updated successfully"
}
```

### Delete a Customer

**URL:** `/api/customers/{id}`  
**Method:** `DELETE`  
**Description:** Delete a specific `Customer` record by its ID.

**Response:**
```json
{
    "message": "Customer info deleted successfully"
}
```


**Example Error Response:**
```json
{
    "message": "An error occurred while saving the customers."
}
```

## Logging

The `CustomersController` logs request data, validated data, and any errors that occur during the execution of its methods.

## Transactions

The `store`, `update`, and `destroy` methods use database transactions to ensure data integrity. If an error occurs, the transaction is rolled back.

## Validation

The `store` and `update` methods validate the request data before performing any operations. The validation rules ensure that the required fields are present and have the correct data types.