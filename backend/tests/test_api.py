import sys
from starlette.testclient import TestClient
from backend.app.main import app

def run_tests():
    print("Initializing TestClient with lifespan...", flush=True)
    with TestClient(app) as client:
        print("1. Testing Health Endpoint...", flush=True)
        r = client.get("/health")
        assert r.status_code == 200, f"Health check failed: {r.text}"
        print("   ✓ Health check OK:", r.json(), flush=True)

        print("2. Testing Public Properties List...", flush=True)
        r = client.get("/api/v1/properties")
        assert r.status_code == 200, f"Public properties failed: {r.text}"
        props = r.json()
        print(f"   ✓ Returned {len(props)} public published properties", flush=True)
        
        # Verify strict security: private fields are NOT present
        for p in props:
            assert "private_survey_number" not in p, "Security leak: private_survey_number exposed!"
            assert "owner_name" not in p, "Security leak: owner_name exposed!"
            assert "owner_phone" not in p, "Security leak: owner_phone exposed!"
            assert "private_brokerage_notes" not in p, "Security leak: private_brokerage_notes exposed!"
        print("   ✓ Security Verification Passed: All private owner & survey fields are strictly stripped.", flush=True)

        print("3. Testing Admin Login for Authorized Admin 1 (Principal Broker)...", flush=True)
        r = client.post(
            "/api/v1/auth/login",
            json={"email": "broker@nilamprime.com", "password": "BrokerPrime@2026"}
        )
        assert r.status_code == 200, f"Admin login failed: {r.text}"
        admin_data = r.json()
        token = admin_data["access_token"]
        print(f"   ✓ Authenticated as: {admin_data['admin_name']} ({admin_data['role']})", flush=True)

        print("4. Testing Admin Dashboard Stats...", flush=True)
        headers = {"Authorization": f"Bearer {token}"}
        r = client.get("/api/v1/properties/admin/stats", headers=headers)
        assert r.status_code == 200, f"Admin stats failed: {r.text}"
        print("   ✓ Admin Stats:", r.json(), flush=True)

        print("5. Testing Public Enquiry Submission...", flush=True)
        r = client.post(
            "/api/v1/enquiries",
            json={
                "customer_name": "K. Balasubramanian",
                "phone": "+91 98421 55667",
                "email": "bala@example.com",
                "message": "Interested in site visit for coconut grove in Pollachi.",
            }
        )
        assert r.status_code == 201, f"Enquiry submission failed: {r.text}"
        enq = r.json()
        print(f"   ✓ Enquiry successfully submitted for {enq['customer_name']}", flush=True)

        print("6. Testing Admin Enquiry Listing...", flush=True)
        r = client.get("/api/v1/enquiries", headers=headers)
        assert r.status_code == 200, f"Admin enquiries failed: {r.text}"
        admin_enqs = r.json()
        print(f"   ✓ Admin retrieved {len(admin_enqs)} customer leads", flush=True)

        print("\n=======================================================", flush=True)
        print("ALL BACKEND API & SECURITY TESTS PASSED SUCCESSFULLY!", flush=True)
        print("=======================================================", flush=True)

if __name__ == "__main__":
    run_tests()
