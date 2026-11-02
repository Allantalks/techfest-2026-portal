# TechFest 2026 Portal - Git Workflow Guide

## Git Branching Strategy

### Branches Used
- `master` — Main production branch
- `feature/performance-optimization` — Feature development branch

---

## Step-by-Step Workflow

### 1. Initialize Repository
```bash
git init
git add .
git commit -m "Initial commit: TechFest 2026 Portal with security features"
```

### 2. Create Feature Branch
```bash
git checkout -b feature/performance-optimization
```

### 3. Make Changes on Feature Branch
```bash
# Edit files for performance optimization
git add frontend/src/App.js
git commit -m "Add performance optimization comments"
```

### 4. Switch to Master and Make Conflicting Change
```bash
git checkout master
# Edit the same file differently
git add frontend/src/App.js
git commit -m "Add main branch header comment"
```

### 5. Merge Feature Branch (Creates Conflict)
```bash
git merge feature/performance-optimization
# Output: CONFLICT (content): Merge conflict in frontend/src/App.js
# Automatic merge failed; fix conflicts and then commit the result.
```

### 6. Resolve Conflict
Open the conflicting file in VS Code. You'll see:
```
<<<<<<< HEAD
// TechFest 2026 - Main Application Entry Point
=======
// Performance: Code splitting with React.lazy() for optimal loading
>>>>>>> feature/performance-optimization
```

Resolve by keeping both changes:
```javascript
// TechFest 2026 - Main Application Entry Point
// Performance: Code splitting with React.lazy() for optimal loading
```

Then commit the resolution:
```bash
git add frontend/src/App.js
git commit -m "Resolve merge conflict: combine header comments"
```

### 7. View History
```bash
git log --oneline --graph
```

Output:
```
* cb89087 (HEAD -> master) Resolve merge conflict: combine header comments
|\
| * bda1d78 (feature/performance-optimization) Add performance optimization comments
* | 1b6b785 Add main branch header comment
|/
* efa6cf9 Initial commit: TechFest 2026 Portal with security features
```

### 8. Push to Remote
```bash
git remote add origin https://github.com/USERNAME/techfest-2026-portal.git
git push -u origin master
```

---

## Conflict Resolution Strategy

1. **Identify** — Git marks conflicts with `<<<<<<<`, `=======`, `>>>>>>>`
2. **Understand** — Read both versions to understand what each branch changed
3. **Decide** — Choose to keep one, both, or a combination
4. **Clean up** — Remove all conflict markers
5. **Test** — Verify the application still works
6. **Commit** — Stage and commit the resolved file

---

*Guide prepared as part of Web Technology Laboratory (23CSB40B)*
