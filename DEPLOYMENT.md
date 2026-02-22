# Deployment Guide - Dave's Fishing Diaries
## DigitalOcean Production Deployment

### Prerequisites
- DigitalOcean account (get $200 free credit for 60 days)
- Domain name: davesfishingdiaries.com
- Strong database password (32+ characters, use password manager)

---

## Step 1: Purchase Domain & Create Droplet

### 1.1 Buy Domain on DigitalOcean
1. Login to DigitalOcean
2. Go to Networking → Domains
3. Purchase `davesfishingdiaries.com` (~$12/year)

### 1.2 Create Droplet
1. Go to Droplets → Create Droplet
2. **Region**: Choose closest to your location (e.g., New York)
3. **Image**: Ubuntu 24.04 (LTS) x64
4. **Size**: Basic - $6/month (1GB RAM, 25GB SSD)
5. **Authentication**: SSH Key (recommended) or Password
6. **Hostname**: davesfishingdiaries
7. Click "Create Droplet"

---

## Step 2: Configure DNS

1. Go to Networking → Domains → davesfishingdiaries.com
2. Add **A Record**:
   - Hostname: `@`
   - Will direct to: `<your-droplet-ip>`
   - TTL: 3600
3. Add **A Record** for www:
   - Hostname: `www`
   - Will direct to: `<your-droplet-ip>`
   - TTL: 3600

Wait 5-10 minutes for DNS propagation.

---

## Step 3: Set Up Server

### 3.1 SSH into Droplet
```bash
ssh root@<your-droplet-ip>
```

### 3.2 Update System
```bash
apt update && apt upgrade -y
```

### 3.3 Install Docker
```bash
# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Install Docker Compose
apt install docker-compose -y

# Verify installation
docker --version
docker-compose --version
```

### 3.4 Configure Firewall
```bash
# Install UFW
apt install ufw -y

# Allow SSH, HTTP, HTTPS
ufw allow 22/tcp
ufw allow 80/tcp
ufw allow 443/tcp

# Enable firewall
ufw enable
ufw status
```

---

## Step 4: Deploy Application

### 4.1 Clone Repository
```bash
cd /root
git clone <your-repo-url> davesfishingdiaries
cd davesfishingdiaries
```

### 4.2 Create Production Environment File
```bash
# Copy template
cp .env.production.template .env.production

# Edit with nano
nano .env.production
```

**Fill in these values:**
```bash
POSTGRES_USER=davesfishing_admin
POSTGRES_PASSWORD=<generate-strong-32-char-password>
POSTGRES_DB=davesfishingdiaries
POSTGRES_HOST=db
POSTGRES_PORT=5432
ENVIRONMENT=production
```

Save and exit (Ctrl+X, Y, Enter)

### 4.3 Update Docker Compose for Production
```bash
nano docker-compose.yml
```

Change the `env_file` for all services:
```yaml
services:
  db:
    env_file:
      - .env.production  # Changed from .env
  
  backend:
    env_file:
      - .env.production  # Changed from .env
```

### 4.4 Upload Your Data
```bash
# Create data directory if needed
mkdir -p data

# Upload your Excel file (from your local machine)
# Use SCP from your local PowerShell:
```
**On your local machine:**
```powershell
scp C:\Users\Dave\dev\davesfishingdiaries\data\catches.xlsx root@<droplet-ip>:/root/davesfishingdiaries/data/
```

### 4.5 Start Application
```bash
cd /root/davesfishingdiaries
docker-compose up -d
```

### 4.6 Verify Services
```bash
docker-compose ps
docker-compose logs -f
```

Check that all services show "Up" status.

---

## Step 5: Set Up SSL (HTTPS)

### 5.1 Install Certbot
```bash
apt install certbot python3-certbot-nginx -y
```

### 5.2 Update Nginx Configuration
```bash
nano ui/app/nginx.conf
```

Add server name:
```nginx
server {
    listen 80;
    server_name davesfishingdiaries.com www.davesfishingdiaries.com;
    
    # Rest of config...
}
```

### 5.3 Restart UI Container
```bash
docker-compose restart ui
```

### 5.4 Get SSL Certificate
```bash
certbot --nginx -d davesfishingdiaries.com -d www.davesfishingdiaries.com
```

Follow prompts:
- Enter email address
- Agree to terms
- Choose: Redirect HTTP to HTTPS

Certbot will auto-renew certificates.

---

## Step 6: Verify Deployment

1. Visit: `https://davesfishingdiaries.com`
2. Check that site loads with green padlock (HTTPS)
3. Test filtering catches
4. Test image zoom functionality
5. Check mobile responsiveness

---

## Maintenance Commands

### View Logs
```bash
docker-compose logs -f backend
docker-compose logs -f db
docker-compose logs -f ui
```

### Restart Services
```bash
docker-compose restart
```

### Update Application
```bash
git pull
docker-compose down
docker-compose up -d --build
```

### Backup Database
```bash
docker exec davesfishingdiaries_db pg_dump -U davesfishing_admin davesfishingdiaries > backup_$(date +%Y%m%d).sql
```

### Restore Database
```bash
docker exec -i davesfishingdiaries_db psql -U davesfishing_admin davesfishingdiaries < backup.sql
```

---

## Cost Summary
- **Droplet**: $6/month ($72/year)
- **Domain**: $12/year
- **SSL Certificate**: FREE (Let's Encrypt)
- **Total**: ~$84/year

---

## Security Checklist
- ✅ Strong database password (32+ chars)
- ✅ `.env.production` not committed to git
- ✅ Firewall enabled (UFW)
- ✅ HTTPS/SSL configured
- ✅ CORS restricted to domain only
- ✅ Production environment variable set

---

## Troubleshooting

### Site not loading
```bash
# Check if containers are running
docker-compose ps

# Check logs
docker-compose logs -f

# Restart all services
docker-compose restart
```

### Database connection error
```bash
# Verify database is running
docker exec -it davesfishingdiaries_db psql -U davesfishing_admin -d davesfishingdiaries

# Check environment variables
docker exec davesfishingdiaries_api env | grep POSTGRES
```

### CORS errors
- Verify `ENVIRONMENT=production` in `.env.production`
- Check backend logs: `docker-compose logs backend`
- Ensure domain matches CORS allowed origins

---

## Support
If you encounter issues, check:
1. DigitalOcean Community Tutorials
2. Docker logs: `docker-compose logs -f`
3. Firewall status: `ufw status`
4. DNS propagation: https://dnschecker.org
