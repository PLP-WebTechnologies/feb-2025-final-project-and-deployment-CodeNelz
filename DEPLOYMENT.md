# Deployment Guide for StyleHub E-commerce Website

This guide provides step-by-step instructions for deploying the StyleHub e-commerce website using different platforms.

## Prerequisites
- A complete copy of the website files
- Git installed (for GitHub Pages deployment)
- A GitHub, Netlify, or Vercel account

## Option 1: GitHub Pages

GitHub Pages is a free hosting service provided by GitHub that allows you to host static websites directly from a GitHub repository.

### Steps:

1. **Create a GitHub repository**
   - Go to [GitHub](https://github.com) and sign in to your account
   - Click on the "+" icon in the top right corner and select "New repository"
   - Name your repository (e.g., "stylehub-ecommerce")
   - Choose public visibility
   - Click "Create repository"

2. **Initialize Git in your project folder**
   ```bash
   cd /path/to/your/project
   git init
   git add .
   git commit -m "Initial commit"
   ```

3. **Connect your local repository to GitHub**
   ```bash
   git remote add origin https://github.com/yourusername/stylehub-ecommerce.git
   git branch -M main
   git push -u origin main
   ```

4. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Click on "Settings"
   - Scroll down to the "GitHub Pages" section
   - Under "Source", select the "main" branch
   - Click "Save"
   - Wait a few minutes for your site to be published
   - Your site will be available at `https://yourusername.github.io/stylehub-ecommerce/`

## Option 2: Netlify

Netlify is a web hosting and automation platform that offers free hosting for static websites with additional features like form handling and serverless functions.

### Steps:

1. **Create a Netlify account**
   - Go to [Netlify](https://www.netlify.com/) and sign up for an account
   - You can sign up using your GitHub, GitLab, or Bitbucket account

2. **Deploy your site**
   
   **Method 1: Drag and Drop**
   - Log in to your Netlify account
   - Go to the "Sites" section
   - Drag and drop your project folder onto the designated area
   - Wait for the upload and deployment to complete
   
   **Method 2: Connect to Git repository**
   - Log in to your Netlify account
   - Click "New site from Git"
   - Select your Git provider (GitHub, GitLab, or Bitbucket)
   - Authorize Netlify to access your repositories
   - Select the repository containing your website
   - Configure build settings if necessary (not needed for this static site)
   - Click "Deploy site"

3. **Configure your site**
   - After deployment, Netlify will assign a random subdomain to your site (e.g., `random-name-123456.netlify.app`)
   - You can change this by going to "Site settings" > "Domain management" > "Custom domains"
   - Click "Options" next to your Netlify domain and select "Edit site name"

4. **Set up a custom domain (optional)**
   - In "Domain management", click "Add custom domain"
   - Enter your domain name and follow the instructions to configure DNS settings

## Option 3: Vercel

Vercel is a cloud platform for static sites and serverless functions that enables developers to host websites with ease.

### Steps:

1. **Create a Vercel account**
   - Go to [Vercel](https://vercel.com/) and sign up for an account
   - You can sign up using your GitHub, GitLab, or Bitbucket account

2. **Install Vercel CLI (optional)**
   ```bash
   npm install -g vercel
   ```

3. **Deploy your site**
   
   **Method 1: Using the Vercel dashboard**
   - Log in to your Vercel account
   - Click "New Project"
   - Import your repository from GitHub, GitLab, or Bitbucket
   - Configure project settings if necessary
   - Click "Deploy"
   
   **Method 2: Using Vercel CLI**
   ```bash
   cd /path/to/your/project
   vercel login
   vercel
   ```
   - Follow the prompts to complete the deployment

4. **Configure your site**
   - After deployment, Vercel will assign a domain to your site (e.g., `your-project.vercel.app`)
   - You can manage your deployment settings from the Vercel dashboard

5. **Set up a custom domain (optional)**
   - In your project settings on the Vercel dashboard, go to "Domains"
   - Click "Add" and enter your domain name
   - Follow the instructions to configure DNS settings

## Troubleshooting

### Common Issues:

1. **Missing images or resources**
   - Make sure all file paths are correct
   - Check that all resources are included in your repository
   - Verify that file names match exactly (case-sensitive)

2. **CSS or JavaScript not loading**
   - Check the browser console for errors
   - Ensure paths to CSS and JavaScript files are correct
   - Verify that there are no syntax errors in your code

3. **Deployment fails**
   - Check the deployment logs for specific errors
   - Make sure your repository doesn't exceed size limits
   - Verify that your code doesn't contain any platform-specific restrictions

### Getting Help:

- GitHub Pages: [GitHub Pages Documentation](https://docs.github.com/en/pages)
- Netlify: [Netlify Support](https://www.netlify.com/support/)
- Vercel: [Vercel Documentation](https://vercel.com/docs)

## Maintaining Your Deployed Site

After deployment, you can update your site by pushing changes to your repository (for GitHub Pages, Netlify, or Vercel with Git integration) or by redeploying using the same method as your initial deployment.

Remember to test your site locally before deploying updates to ensure everything works as expected.
