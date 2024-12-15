# Production Deployment Checklist

## Domain Setup
1. [ ] Configure subdirectory `/aivizdata` on aireinvestor.com
2. [ ] Set up SSL certificate (if not already present)
3. [ ] Configure proper DNS records

## Google OAuth Setup
1. [ ] Add production domains to Google Cloud Console
   - `https://aireinvestor.com`
2. [ ] Add production redirect URIs
   - `https://aireinvestor.com/aivizdata/api/auth/callback/google`
3. [ ] Verify domain ownership in Google Cloud Console
4. [ ] Enable necessary Google APIs
   - Google Drive API
   - Google OAuth 2.0

## Environment Configuration
1. [ ] Generate new NEXTAUTH_SECRET for production
2. [ ] Set up production environment variables
3. [ ] Configure proper CORS settings
4. [ ] Set up rate limiting

## Security Measures
1. [ ] Enable CSP headers
2. [ ] Configure CORS properly
3. [ ] Set up rate limiting
4. [ ] Enable security headers
5. [ ] Configure proper cookie settings

## Deployment Steps
1. [ ] Build application with production flags
   ```bash
   npm run build
   ```
2. [ ] Test production build locally
   ```bash
   npm run start
   ```
3. [ ] Deploy to production server
4. [ ] Verify all routes work with subpath
5. [ ] Test authentication flow
6. [ ] Verify Google Drive integration

## Monitoring Setup
1. [ ] Set up error tracking
2. [ ] Configure performance monitoring
3. [ ] Set up logging
4. [ ] Configure alerts

## Testing Checklist
1. [ ] Test authentication flow
2. [ ] Verify Google Drive access
3. [ ] Check visualization features
4. [ ] Test error handling
5. [ ] Verify mobile responsiveness

## Backup & Recovery
1. [ ] Set up database backups
2. [ ] Configure automated backups
3. [ ] Test recovery procedures

## Performance Optimization
1. [ ] Enable caching
2. [ ] Configure CDN
3. [ ] Optimize images
4. [ ] Enable compression

## Documentation
1. [ ] Update API documentation
2. [ ] Document deployment process
3. [ ] Create troubleshooting guide
4. [ ] Update user documentation

## Legal & Compliance
1. [ ] Update privacy policy
2. [ ] Update terms of service
3. [ ] Verify GDPR compliance
4. [ ] Check data handling procedures 