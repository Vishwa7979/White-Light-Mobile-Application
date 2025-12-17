# 🤝 Contributing to WhiteLight

First off, thank you for considering contributing to WhiteLight! It's people like you that make WhiteLight such a great platform.

---

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How to Contribute](#how-to-contribute)
- [Development Workflow](#development-workflow)
- [Code Style](#code-style)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Features](#suggesting-features)

---

## 📜 Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inspiring community for all. Please be respectful and constructive.

### Our Standards

**Positive behavior includes:**
- Being respectful of differing viewpoints
- Gracefully accepting constructive criticism
- Focusing on what's best for the community
- Showing empathy towards other community members

**Unacceptable behavior includes:**
- Trolling, insulting/derogatory comments
- Public or private harassment
- Publishing others' private information
- Other conduct which could reasonably be considered inappropriate

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm 9+
- Git
- Code editor (VS Code recommended)

### First-Time Setup

```bash
# 1. Fork the repository on GitHub

# 2. Clone YOUR fork
git clone https://github.com/YOUR_USERNAME/whitelight.git
cd whitelight

# 3. Add upstream remote
git remote add upstream https://github.com/[original-org]/whitelight.git

# 4. Install dependencies
npm install

# 5. Start development server
npm run dev
```

### Stay Updated

```bash
# Fetch latest changes from upstream
git fetch upstream

# Merge changes into your main branch
git checkout main
git merge upstream/main
```

---

## 💡 How to Contribute

### Areas for Contribution

1. **Bug Fixes** - Fix issues from GitHub Issues
2. **New Features** - Implement features from roadmap
3. **UI/UX Improvements** - Enhance design and user experience
4. **Documentation** - Improve docs, add examples
5. **Testing** - Add tests, improve coverage
6. **Performance** - Optimize code, reduce bundle size
7. **Accessibility** - Make app more accessible

### Good First Issues

Look for issues labeled:
- `good first issue` - Great for newcomers
- `help wanted` - We need your help!
- `documentation` - Improve docs
- `bug` - Something isn't working

---

## 🔄 Development Workflow

### 1. Create a Branch

```bash
# Create and switch to a new branch
git checkout -b feature/your-feature-name

# Branch naming conventions:
# feature/    - New features
# fix/        - Bug fixes
# docs/       - Documentation updates
# refactor/   - Code refactoring
# style/      - UI/styling changes
# test/       - Adding tests
```

### 2. Make Your Changes

- Write clean, readable code
- Follow existing code style
- Add comments where necessary
- Update documentation if needed

### 3. Test Your Changes

```bash
# Test locally
npm run dev

# Build to verify no errors
npm run build

# Preview production build
npm run preview
```

**Testing checklist:**
- [ ] App loads without errors
- [ ] Your feature works as expected
- [ ] No console errors/warnings
- [ ] Mobile responsive (test at 375px)
- [ ] Works on Chrome, Safari, Firefox
- [ ] No TypeScript errors (`npx tsc --noEmit`)

### 4. Commit Your Changes

```bash
# Stage changes
git add .

# Commit with conventional commit message
git commit -m "feat: add new shopping filter"
```

### 5. Push to Your Fork

```bash
git push origin feature/your-feature-name
```

### 6. Create Pull Request

1. Go to your fork on GitHub
2. Click "Compare & pull request"
3. Fill out PR template
4. Submit!

---

## 🎨 Code Style

### TypeScript

```typescript
// ✅ Good - Use interfaces for props
interface ComponentProps {
  title: string;
  onClose: () => void;
}

// ✅ Good - Type function parameters
function addProduct(product: Product): Promise<void> {
  // ...
}

// ❌ Avoid - No implicit any
function getData(id) {  // Missing type
  // ...
}
```

### React Components

```typescript
// ✅ Good - Functional components with proper types
interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  
  return (
    <div onClick={onClick}>
      <h3>{product.name}</h3>
    </div>
  );
}

// ❌ Avoid - Class components (use functional instead)
class ProductCard extends Component {
  // Prefer functional components
}
```

### Styling with Tailwind

```typescript
// ✅ Good - Use Tailwind utilities
<button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
  Click Me
</button>

// ❌ Avoid - Inline styles (unless dynamic values)
<button style={{ padding: '8px 16px', backgroundColor: 'blue' }}>
  Click Me
</button>

// ⚠️ Important - Don't override typography
<h1 className="text-gray-900">Title</h1>  // ✅ Correct
<h1 className="text-2xl font-bold">Title</h1>  // ❌ Avoid unless requested
```

### File Organization

```
components/
  ├── ProductCard.tsx        # Component file
  └── ProductCard.test.tsx   # Tests (if adding tests)

services/
  └── database.ts            # Service files

data/
  └── mockData.ts            # Data files
```

### Naming Conventions

- **Components:** `PascalCase.tsx` (e.g., `ProductCard.tsx`)
- **Services:** `camelCase.ts` (e.g., `database.ts`)
- **Interfaces:** `PascalCase` (e.g., `Product`, `CartItem`)
- **Functions:** `camelCase` (e.g., `addToCart`, `getProduct`)
- **Constants:** `UPPER_SNAKE_CASE` (e.g., `MOCK_PRODUCTS`)

---

## 📝 Commit Guidelines

We use **Conventional Commits** for clear commit messages.

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, no logic change)
- `refactor:` - Code refactoring
- `perf:` - Performance improvements
- `test:` - Adding tests
- `chore:` - Maintenance tasks

### Examples

```bash
# Good commits
git commit -m "feat: add sustainability filter to home screen"
git commit -m "fix: cart not persisting after page refresh"
git commit -m "docs: update deployment guide with Netlify instructions"
git commit -m "refactor: extract cart logic into custom hook"
git commit -m "style: improve mobile spacing on product cards"

# Bad commits
git commit -m "fixed stuff"
git commit -m "updates"
git commit -m "asdfasdf"
```

### Commit Message Best Practices

- Use present tense ("add feature" not "added feature")
- Keep subject line under 50 characters
- Capitalize subject line
- Don't end subject with a period
- Use body to explain what and why (not how)

---

## 🔍 Pull Request Process

### PR Template

When creating a PR, include:

```markdown
## Description
[What does this PR do? Why is it needed?]

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Code refactoring
- [ ] Performance improvement

## Testing Done
- [ ] Tested locally
- [ ] Tested on mobile
- [ ] No console errors
- [ ] TypeScript passes
- [ ] Build succeeds

## Screenshots (if applicable)
[Add screenshots of UI changes]

## Related Issues
Closes #123
```

### Review Process

1. **Automated Checks:**
   - TypeScript compilation passes
   - Build completes successfully
   - No linting errors

2. **Code Review:**
   - At least 1 approval required
   - Address reviewer feedback
   - Keep discussion professional

3. **Merge:**
   - Squash and merge (usually)
   - Delete branch after merge

### PR Best Practices

- Keep PRs small and focused
- One feature/fix per PR
- Update documentation if needed
- Add screenshots for UI changes
- Respond to feedback promptly
- Be open to suggestions

---

## 🐛 Reporting Bugs

### Before Submitting

1. **Check existing issues** - Your bug may already be reported
2. **Reproduce the bug** - Can you consistently trigger it?
3. **Test on latest version** - Is it still present?

### Bug Report Template

```markdown
## Bug Description
[Clear description of the bug]

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

## Expected Behavior
[What should happen?]

## Actual Behavior
[What actually happens?]

## Screenshots
[If applicable]

## Environment
- Browser: [e.g., Chrome 120]
- Device: [e.g., iPhone 14]
- OS: [e.g., iOS 17]

## Additional Context
[Any other relevant information]
```

---

## 💡 Suggesting Features

### Feature Request Template

```markdown
## Feature Description
[Clear description of the feature]

## Problem It Solves
[What user problem does this address?]

## Proposed Solution
[How would this feature work?]

## Alternatives Considered
[What other solutions did you think about?]

## Additional Context
[Mockups, examples, references]
```

### Feature Discussion

- Features should align with WhiteLight's vision
- Consider mobile-first design
- Think about developer experience
- Evaluate impact on performance

---

## 🧪 Testing Guidelines

### Manual Testing

Test on these viewports:
- **Mobile:** 375px (iPhone SE)
- **Mobile Large:** 428px (iPhone 14 Pro Max)
- **Tablet:** 768px (iPad)

Test on these browsers:
- Chrome (primary)
- Safari (iOS compatibility)
- Firefox
- Edge

### Testing Checklist

- [ ] All screens load without errors
- [ ] Navigation works correctly
- [ ] Forms validate properly
- [ ] Images load correctly
- [ ] Animations are smooth
- [ ] No console errors/warnings
- [ ] Works offline (PWA features)
- [ ] Accessibility (keyboard navigation, screen readers)

---

## 📚 Documentation

### When to Update Docs

Update documentation when:
- Adding new features
- Changing API endpoints
- Modifying configuration
- Adding dependencies
- Changing deployment process

### Where to Update

- `README.md` - Project overview
- `DEVELOPER_ONBOARDING.md` - Dev setup
- `DEPLOYMENT.md` - Deployment instructions
- `SUPABASE_INTEGRATION.md` - API reference
- Code comments - Complex logic

---

## ❓ Questions?

- **General Questions:** GitHub Discussions
- **Bug Reports:** GitHub Issues
- **Security Issues:** Email security@whitelight.com
- **Slack:** #whitelight-dev channel

---

## 🎉 Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md
- Mentioned in release notes
- Recognized in our README

---

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for contributing to WhiteLight! 🌟**

Every contribution, no matter how small, makes a difference.
