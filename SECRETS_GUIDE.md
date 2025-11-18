# How to Avoid Committing Secrets to Git

## ✅ Best Practices

### 1. **Always Check `.gitignore` Before Committing**

- Add sensitive files to `.gitignore` **BEFORE** the first commit
- Check `git status` before every commit to see what will be committed

### 2. **Use Environment Variables (.env files)**

Instead of hardcoding tokens in files like `Token.md`:

**Create `.env` file** (already in `.gitignore`):

```
GITHUB_TOKEN=ghp_your_token_here
API_KEY=your_api_key_here
```

**Create `.env.example`** (commit this, not `.env`):

```
GITHUB_TOKEN=your_token_here
API_KEY=your_api_key_here
```

**Use in code** (with dotenv):

```javascript
import dotenv from "dotenv";
dotenv.config();

const token = process.env.GITHUB_TOKEN;
```

### 3. **Pre-Commit Checklist**

Before running `git commit`, always:

```bash
# Check what will be committed
git status

# Review the actual changes
git diff

# If you see any secrets, STOP and remove them!
```

### 4. **Use Git Hooks (Optional but Recommended)**

Install `git-secrets` or use pre-commit hooks to scan for secrets automatically.

### 5. **Common Patterns to Ignore**

Your `.gitignore` should include:

- `*.env` files
- `*.token`, `*.key`, `*.secret` files
- Files with "token", "secret", "key" in the name
- Certificate files (`*.pem`, `*.p12`, `*.pfx`)

## 🚨 If You Already Committed Secrets

1. **Remove from tracking**: `git rm --cached <file>`
2. **Rewrite history**: Use `git filter-branch` or `git filter-repo`
3. **Force push**: `git push --force` (only if you're sure!)
4. **Revoke exposed secrets**: Generate new tokens immediately

## 📝 Quick Reference

```bash
# Check what's staged
git status

# See file contents before committing
git diff --cached

# Remove file from git (keep locally)
git rm --cached filename

# Add to .gitignore
echo "filename" >> .gitignore
```
