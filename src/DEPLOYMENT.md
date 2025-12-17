# 🚀 WhiteLight Deployment Guide

## Quick Deploy Options

### Option 1: Deploy to Vercel (Recommended - 1-Click)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone)

**Steps:**
1. Click the "Deploy" button above
2. Connect your GitHub account
3. Vercel will auto-detect the React app
4. Click "Deploy"
5. Your app will be live in ~2 minutes!

**Live URL:** `https://whitelight-[your-project].vercel.app`

---

### Option 2: Deploy to Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start)

**Steps:**
1. Click "Deploy to Netlify"
2. Connect to GitHub
3. Configure build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
4. Click "Deploy site"

**Live URL:** `https://whitelight-[random].netlify.app`

---

### Option 3: Deploy to GitHub Pages

**Steps:**

1. **Install gh-pages:**
```bash
npm install --save-dev gh-pages
```

2. **Add to package.json:**
```json
{
  "homepage": "https://[your-username].github.io/whitelight",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

3. **Deploy:**
```bash
npm run deploy
```

4. **Enable GitHub Pages:**
   - Go to repo Settings → Pages
   - Source: `gh-pages` branch
   - Save

**Live URL:** `https://[your-username].github.io/whitelight`

---

## Environment Setup

### 1. Supabase Configuration

The app uses Supabase info from `/utils/supabase/info.tsx`. This file contains:
- `projectId` - Your Supabase project ID
- `publicAnonKey` - Your Supabase public anonymous key

**These are already configured and safe to commit** (they're public keys meant for client-side use).

### 2. Environment Variables (Optional)

If you want to use environment variables instead:

Create `.env` file:
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

Update `/utils/supabase/info.tsx`:
```typescript
export const projectId = import.meta.env.VITE_SUPABASE_URL?.split('//')[1]?.split('.')[0] || 'your-project-id';
export const publicAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';
```

**Add to Vercel/Netlify:**
- Vercel: Settings → Environment Variables
- Netlify: Site settings → Build & deploy → Environment

---

## Build & Deploy Commands

### Development
```bash
npm install       # Install dependencies
npm run dev      # Start dev server (http://localhost:5173)
```

### Production Build
```bash
npm run build    # Create production build
npm run preview  # Preview production build locally
```

### Deploy Commands
```bash
# Vercel
vercel deploy --prod

# Netlify
netlify deploy --prod

# GitHub Pages
npm run deploy
```

---

## Custom Domain Setup

### Vercel
1. Go to Project Settings → Domains
2. Add your domain: `whitelight.com`
3. Update DNS records (Vercel provides instructions)
4. SSL certificate auto-generated ✅

### Netlify
1. Site settings → Domain management
2. Add custom domain
3. Configure DNS
4. SSL auto-enabled ✅

---

## Performance Optimization

### 1. Enable Compression
Both Vercel and Netlify automatically enable Brotli/Gzip compression.

### 2. Image Optimization
Consider using these services:
- **Vercel Image Optimization:** `next/image` equivalent
- **Cloudinary:** For dynamic image transformations
- **imgix:** Real-time image processing

### 3. CDN Configuration
- ✅ Vercel: Global Edge Network (automatic)
- ✅ Netlify: Netlify Edge (automatic)

### 4. Caching Headers
Add `vercel.json` for custom caching:
```json
{
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

---

## Analytics Setup

### Google Analytics
Add to `index.html`:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Vercel Analytics
```bash
npm install @vercel/analytics
```

Add to `App.tsx`:
```typescript
import { Analytics } from '@vercel/analytics/react';

function App() {
  return (
    <>
      {/* Your app */}
      <Analytics />
    </>
  );
}
```

---

## Monitoring & Error Tracking

### Sentry Integration
```bash
npm install @sentry/react
```

Configure in `main.tsx`:
```typescript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "your-sentry-dsn",
  integrations: [new Sentry.BrowserTracing()],
  tracesSampleRate: 1.0,
});
```

---

## CI/CD Pipeline

### GitHub Actions (Auto-deploy)

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy WhiteLight

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run build
        
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

---

## Testing Before Deploy

### 1. Run Build Locally
```bash
npm run build
npm run preview
```

### 2. Test on Mobile
- Use Chrome DevTools → Device Toolbar
- Test on real device via local network:
  ```bash
  npm run dev -- --host
  # Access via http://[your-ip]:5173
  ```

### 3. Lighthouse Audit
- Open Chrome DevTools → Lighthouse
- Run audit on production build
- Target scores: 90+ on all metrics

---

## Post-Deployment Checklist

- [ ] App loads without errors
- [ ] Database connection working
- [ ] All images loading correctly
- [ ] Navigation between screens works
- [ ] Cart persistence functional
- [ ] Onboarding saves to database
- [ ] Mobile responsive design verified
- [ ] SSL certificate active (HTTPS)
- [ ] Custom domain configured (if applicable)
- [ ] Analytics tracking setup
- [ ] Error monitoring configured
- [ ] Performance metrics > 90 (Lighthouse)

---

## Rollback Strategy

### Vercel
```bash
vercel rollback [deployment-url]
```
Or use Vercel Dashboard → Deployments → Promote to Production

### Netlify
Dashboard → Deploys → Click on previous deploy → "Publish deploy"

### GitHub Pages
```bash
git revert HEAD
npm run deploy
```

---

## Scaling Considerations

### Current Architecture
```
Users → CDN (Vercel/Netlify) → React App → Supabase API → Database
```

### When to Scale Up

**If you reach:**
- 10K+ daily active users → Consider Redis caching
- 100K+ products → Implement database indexing
- Real-time bidding → Enable Supabase Realtime
- Heavy traffic → Add rate limiting

---

## Cost Estimates

### Free Tier Limits

**Vercel Free:**
- ✅ 100GB bandwidth/month
- ✅ Unlimited static deployments
- ✅ SSL included
- ✅ Global CDN

**Netlify Free:**
- ✅ 100GB bandwidth/month
- ✅ 300 build minutes/month
- ✅ SSL included

**Supabase Free:**
- ✅ 500MB database
- ✅ 2GB bandwidth/month
- ✅ 50K monthly active users
- ✅ 500K edge function invocations

**Total: $0/month** for up to 10K users! 🎉

---

## Production URLs

After deployment, you'll have:

- **Frontend:** `https://whitelight.vercel.app`
- **API:** `https://[project-id].supabase.co/functions/v1/make-server-4971ce97`
- **Database:** Supabase (managed)

---

## Support & Help

- **Vercel Docs:** https://vercel.com/docs
- **Netlify Docs:** https://docs.netlify.com
- **Supabase Docs:** https://supabase.com/docs
- **Vite Docs:** https://vitejs.dev

---

## Next Steps

1. ✅ Deploy to Vercel/Netlify
2. ✅ Share public URL with stakeholders
3. ✅ Setup custom domain (optional)
4. ✅ Enable analytics
5. ✅ Monitor performance
6. ✅ Share with developers (see DEVELOPER_ONBOARDING.md)

---

**Your WhiteLight app is ready for production! 🚀**
