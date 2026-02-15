# Me

The `/me` endpoint is a special endpoint that examines the Instagram User Access Token included in the request, determines the ID of the Instagram user who granted the token, and uses that ID to query the [User](../IG%20User/INSTAGRAM_IG_USER.md) endpoint.

---

## Operations

### Reading
`GET /me`

Get fields and edges on the User whose Instagram User Access Token is being used in the query. 

> [!NOTE]
> This endpoint translates to `GET /{user-id}`, based on the User ID identified by the access token used in the query.

#### Request Syntax
```bash
GET https://graph.instagram.com/v24.0/me
  ?fields=<FIELDS>
  &access_token=<ACCESS_TOKEN>
```

---

## Requirements and Usage
Refer to the [IG User Reference](../IG%20User/INSTAGRAM_IG_USER.md) for a full list of supported fields, requirements, and permissions.

---

## Operations Not Supported
- **Creating**: Not supported.
- **Updating**: Not supported.
- **Deleting**: Not supported.
