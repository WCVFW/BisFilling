# CRM Frontend-Backend Integration Guide

## Summary
The B2C CRM system is now fully implemented with:
- ✅ Backend: All entities, repositories, services, and REST endpoints
- ✅ Frontend: UI components created
- ⚠️ Integration: Needs to replace mock data with real API calls

## Backend API Endpoints (Already Working)

### Customer Profiles
- `GET /api/crm/customer-profiles` - Get all customer profiles
- `GET /api/crm/customer-profile/me` - Get current user's profile
- `POST /api/crm/customer-profile` - Create customer profile
- `PUT /api/crm/customer-profile/{id}` - Update customer profile

### Service Requests
- `GET /api/crm/service-requests` - Get all service requests
- `GET /api/crm/service-requests/customer/{customerProfileId}` - Get by customer
- `POST /api/crm/service-request` - Create service request
- `PUT /api/crm/service-request/{id}` - Update service request

### Documents
- `GET /api/crm/documents/customer/{customerProfileId}` - Get customer documents
- `POST /api/crm/document` - Upload document
- `DELETE /api/crm/document/{id}` - Delete document

### Support Tickets
- `GET /api/crm/support-tickets` - Get all tickets
- `GET /api/crm/support-tickets/customer/{customerProfileId}` - Get by customer
- `POST /api/crm/support-ticket` - Create ticket
- `PUT /api/crm/support-ticket/{id}/status` - Update ticket status

### Wallet
- `GET /api/crm/wallet/customer/{customerProfileId}` - Get wallet
- `POST /api/crm/wallet/add-money` - Add money
- `POST /api/crm/wallet/deduct` - Deduct money (admin only)
- `GET /api/crm/wallet/{walletId}/transactions` - Get transactions

### Dashboard
- `GET /api/crm/dashboard-stats` - Get CRM statistics

## Frontend Components to Update

### 1. AdminCrmDashboard.jsx
**Current**: Uses mock data
**Needs**: 
```javascript
useEffect(() => {
  const fetchData = async () => {
    const stats = await crmAPI.getDashboardStats();
    const customers = await crmAPI.getAllProfiles();
    const services = await crmAPI.getAllServiceRequests();
    // Update state with real data
  };
  fetchData();
}, []);
```

### 2. AdminCustomerList.jsx
**Current**: Uses mock data
**Needs**:
```javascript
useEffect(() => {
  const fetchCustomers = async () => {
    const res = await crmAPI.getAllProfiles();
    setCustomers(res.data);
  };
  fetchCustomers();
}, []);
```

### 3. AdminCustomerDetail.jsx
**Current**: Uses mock data
**Needs**:
```javascript
useEffect(() => {
  const fetchCustomerData = async () => {
    const profile = await crmAPI.getAllProfiles(); // filter by id
    const services = await crmAPI.getServiceRequestsByCustomer(profileId);
    const documents = await crmAPI.getDocumentsByCustomer(profileId);
    const wallet = await crmAPI.getWallet(profileId);
    const tickets = await crmAPI.getTicketsByCustomer(profileId);
    // Update state
  };
  fetchCustomerData();
}, [id]);
```

## Quick Implementation Steps

1. **Test Backend First**:
```bash
# Test if backend is running
curl http://localhost:8080/api/crm/dashboard-stats

# Should return: {"totalCustomers":0,"activeServices":0,"pendingRequests":0}
```

2. **Update Each Component**:
   - Add `useState` for data and loading states
   - Add `useEffect` to fetch data on mount
   - Replace hardcoded arrays with state variables
   - Add error handling

3. **Add Loading States**:
```javascript
{loading ? (
  <div>Loading...</div>
) : (
  <DataTable data={customers} />
)}
```

4. **Add Error Handling**:
```javascript
try {
  const res = await crmAPI.getAllProfiles();
  setCustomers(res.data);
} catch (error) {
  console.error('Error fetching customers:', error);
  setError(error.message);
}
```

## Example: Complete AdminCustomerList with Real Data

```javascript
import React, { useState, useEffect } from "react";
import { crmAPI } from "../../../../lib/api";
import DataTable from "../../../../components/DataTable";

const AdminCustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const res = await crmAPI.getAllProfiles();
      const profiles = res.data.map(profile => ({
        id: profile.id,
        name: profile.user?.fullName || 'N/A',
        email: profile.user?.email || 'N/A',
        phone: profile.user?.phone || 'N/A',
        status: profile.status,
        kycStatus: profile.kycStatus,
        walletBalance: 0 // Fetch from wallet API if needed
      }));
      setCustomers(profiles);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <DataTable 
      data={customers}
      columns={[...]}
    />
  );
};
```

## Testing the Integration

1. **Create a test customer profile**:
```bash
curl -X POST http://localhost:8080/api/crm/customer-profile \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "whatsappNumber": "+91 9876543210",
    "dateOfBirth": "1990-01-01",
    "gender": "Male"
  }'
```

2. **Verify it appears in the UI**:
   - Navigate to `/dashboard/admin/crm/customers`
   - Should see the customer in the list

3. **Test CRUD operations**:
   - Create: Add new customer
   - Read: View customer details
   - Update: Edit customer profile
   - Delete: Remove customer (if implemented)

## Current Status

✅ **Backend**: 100% Complete and Running
✅ **Database**: Tables auto-created by Hibernate
✅ **API**: All endpoints functional
⚠️ **Frontend**: UI created but using mock data
🔧 **Next Step**: Replace mock data with API calls in each component

The system is ready - just need to connect the frontend to the backend APIs!
