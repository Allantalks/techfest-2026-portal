# Git Workflow Guide - TechFest 2026 Portal

## Step-by-Step Git Commands

### 1. Initialize Repository
```bash
cd techfest-2026-portal
git init
```

### 2. Create .gitignore
The `.gitignore` file prevents sensitive and unnecessary files from being tracked:
```
node_modules/    # Dependencies (reinstalled via npm install)
.env             # Secret keys and passwords
frontend/build/  # Generated build output
```

### 3. First Commit
```bash
git add .
git commit -m "Initial commit: TechFest 2026 Portal setup"
```

### 4. Add Security Packages and Commit
```bash
cd backend
npm install express-mongo-sanitize helmet
git add .
git commit -m "Add security: helmet and mongo-sanitize"
```

### 5. Feature Branch Workflow
```bash
# Create and switch to feature branch
git checkout -b feature-gallery

# Make changes to Gallery.js (add lazy loading)
# ...edit files...

git add .
git commit -m "Add gallery page with lazy-loaded images"

# Switch back to main and merge
git checkout main
git merge feature-gallery
```

### 6. Create a Merge Conflict (For Demonstration)

```bash
# Step 1: Create branch A and modify line
git checkout -b branch-a
# Edit server.js line 10: change port to 3001
git add . && git commit -m "Branch A: change port to 3001"

# Step 2: Go back to main and modify same line
git checkout main
# Edit server.js line 10: change port to 4000
git add . && git commit -m "Main: change port to 4000"

# Step 3: Try to merge - CONFLICT!
git merge branch-a
# Auto-merging server.js
# CONFLICT (content): Merge conflict in server.js
```

### 7. Resolve the Merge Conflict

Open `server.js` and find the conflict markers:
```
<<<<<<< HEAD
const PORT = process.env.PORT || 4000;
=======
const PORT = process.env.PORT || 3001;
>>>>>>> branch-a
```

**Resolution:** Keep the correct version and remove markers:
```javascript
const PORT = process.env.PORT || 5000;
```

Then commit the resolution:
```bash
git add server.js
git commit -m "Resolve merge conflict: use PORT 5000"
```

### 8. Push to GitHub

```bash
# Create a new empty repository on github.com first, then:
git remote add origin https://github.com/YOUR_USERNAME/techfest-2026-portal.git
git branch -M main
git push -u origin main
```

### 9. Branch History Visualization

After completing the workflow above, run:
```bash
git log --oneline --graph --all
```

Expected output:
```
*   Resolve merge conflict: use PORT 5000
|\
| * Branch A: change port to 3001
* | Main: change port to 4000
|/
* Add gallery page with lazy-loaded images
* Add security: helmet and mongo-sanitize
* Initial commit: TechFest 2026 Portal setup
```

This shows the branch, merge, and conflict resolution history.
