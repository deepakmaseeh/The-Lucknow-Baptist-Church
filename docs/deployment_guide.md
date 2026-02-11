# Deployment Guide: Hosting on Vercel

This guide outlines the steps to host both your **Frontend (Client)** and **Backend (Server)** on Vercel for free.

## Strategy: Two Projects, One Repo
We will deploy the `client` and `server` directories as two separate Vercel projects linked to the same GitHub repository. This is the most stable method.

## Prerequisites
1.  **GitHub Account**: You need to push your code to a GitHub repository.
2.  **Vercel Account**: Sign up at [vercel.com](https://vercel.com) using your GitHub account.

---

## Step 1: Push Code to GitHub
1.  Initialize a Git repository if you haven't (VS Code Source Control tab -> Initialize).
2.  Commit all your changes.
3.  Publish the branch to a new private GitHub repository.

## Step 2: Deploy Backend (Server)
1.  Go to your **Vercel Dashboard** and click **"Add New..."** -> **"Project"**.
2.  Import your GitHub repository.
3.  **Configure Project**:
    *   **Project Name**: e.g., `church-website-server`
    *   **Root Directory**: Click "Edit" and select `server`.
    *   **Framework Preset**: Select **Other**.
    ### 2. Configure Environment Variables
In your Vercel Project Settings -> Environment Variables, add:

- `MONGO_URI`: Your MongoDB Connection String.
- `JWT_SECRET`: A secure random string for login.
- `NODE_ENV`: `production`
- `CLOUDINARY_CLOUD_NAME`: Your Cloudinary Cloud Name.
- `CLOUDINARY_API_KEY`: Your Cloudinary API Key.
- `CLOUDINARY_API_SECRET`: Your Cloudinary API Secret.
4.  Click **Deploy**.
5.  **Copy the Backend URL**: Once deployed, copy the domain ending in `.vercel.app` (e.g., `https://church-website-server.vercel.app`).

## Step 3: Deploy Frontend (Client)
1.  Go back to **Vercel Dashboard**.
2.  Import the **SAME** GitHub repository again.
3.  **Configure Project**:
    *   **Project Name**: e.g., `church-website-client`
    *   **Root Directory**: Click "Edit" and select `client`.
    *   **Framework Preset**: **Vite** (Should strictly be detected, but verify).
    *   **Environment Variables**:
        *   `VITE_API_BASE_URL`: **https://your-backend-app.vercel.app** (The URL from Step 2, NO trailing slash).
4.  Click **Deploy**.

## Troubleshooting
- **Images not uploading?** Check your Cloudinary credentials in the Vercel Backend Project Settings.
- **"Network Error" on Frontend?** Check your `VITE_API_BASE_URL` in the Vercel Frontend Project Settings. Ensure it starts with `https://` and has NO trailing `/`.

## Step 4: Update Frontend to use Environment Variable (BEFORE Step 3)
We need to make a small change to ensure the frontend connects to the deployed backend instead of `localhost`.

1.  Open `client/.env` (create if missing).
2.  Add: `VITE_API_BASE_URL=https://your-backend-url.vercel.app` (You will update this after deploying backend).
3.  Update your API calls (e.g., in `fetch`) to use this URL.

**I will apply this fix for you now to ensure smooth deployment.**

---

## Final Steps
After I apply the fix:
1.  Push the changes to GitHub.
2.  Deploy Backend.
3.  Get Backend URL.
4.  Add `VITE_API_BASE_URL` to the **Frontend Project Settings** in Vercel.
5.  Deploy Frontend.
