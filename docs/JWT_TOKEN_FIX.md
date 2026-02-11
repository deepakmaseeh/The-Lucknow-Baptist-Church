# JWT Token Signature Error - Quick Fix

## Problem
```
JsonWebTokenError: invalid signature
```

This means your stored login token was created with a different `JWT_SECRET` than what's currently in your server `.env` file.

## ✅ Solution (2 Steps)

### Step 1: Logout and Clear Token

**In your browser:**
1. Open DevTools (F12)
2. Go to Console tab
3. Run this command:
```javascript
localStorage.clear()
```

**Or manually:**
1. Go to http://localhost:5173/admin/login
2. Click Logout (if there's a logout button)

### Step 2: Login Again

1. Go to http://localhost:5173/admin/login
2. Enter your admin credentials
3. Login

This will create a new token with the current JWT_SECRET.

### Step 3: Test Analytics

1. Go to http://localhost:5173/admin/analytics
2. Should now work! ✅

---

## 🔍 Why This Happened

When you login, the server creates a JWT token using the `JWT_SECRET` from `.env`. If the `JWT_SECRET` changes later (or was different before), old tokens become invalid.

## 🛡️ Prevention

**Don't change `JWT_SECRET` in production!** If you must change it:
1. All users will need to login again
2. Clear localStorage in browser
3. Get new tokens

---

## ✅ Verification

After logging in again, check browser console - the errors should be gone!
