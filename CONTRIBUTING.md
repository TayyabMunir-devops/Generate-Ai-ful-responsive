# 🤝 Contributing Guide

Thank you for considering contributing to Professional ChatGPT Clone! This guide will help you get started.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Making Changes](#making-changes)
- [Submitting Changes](#submitting-changes)
- [Coding Standards](#coding-standards)
- [Commit Messages](#commit-messages)
- [Pull Request Process](#pull-request-process)

## 📜 Code of Conduct

### Our Pledge
We are committed to providing a welcoming and inspiring community for all. Be respectful, inclusive, and constructive.

### Expected Behavior
- Use welcoming and inclusive language
- Be respectful of differing opinions
- Accept constructive criticism gracefully
- Focus on what is best for the community

### Unacceptable Behavior
- Harassment, discrimination, or offensive language
- Trolling or insulting comments
- Publishing private information
- Other conduct that is clearly unprofessional

## 🚀 Getting Started

### 1. Fork the Repository
```bash
# Click "Fork" on GitHub
# Clone your fork
git clone https://github.com/YOUR_USERNAME/professional-chatgpt-clone.git
cd professional-chatgpt-clone
```

### 2. Add Upstream Remote
```bash
git remote add upstream https://github.com/ORIGINAL_OWNER/professional-chatgpt-clone.git
git fetch upstream
```

### 3. Create a Branch
```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

## 🔧 Development Setup

### Install Dependencies
```bash
npm run install-all
```

### Start Development Servers

**Terminal 1:**
```bash
npm run dev
```

**Terminal 2:**
```bash
npm run client
```

### Verify Setup
- Backend running at http://localhost:3000
- Frontend running at http://localhost:5173
- No console errors
- Can send test messages

## ✏️ Making Changes

### Code Quality Standards

#### JavaScript/React
```javascript
// ✅ Good
const handleClick = () => {
  // Clear, descriptive name
  // Single responsibility
  doSomething();
};

// ❌ Bad
const h = () => {
  // Unclear naming
  doSomething();
  doSomethingElse();
  doAnotherThing();
};
```

#### Formatting
```bash
# Format all code
npm run format

# Lint code
npm run lint
```

### File Structure

**New Component Example:**
```
components/
├── MyComponent.jsx      // Component logic
├── MyComponent.css      // Component styles
└── index.js            // Export
```

**New Service Example:**
```
utils/
├── myService.js        // Service implementation
├── myService.test.js   // Tests
└── index.js           // Export
```

### Testing Your Changes

```bash
# Run tests
npm test

# Test specific file
npm test -- server/tests/routes/chat.test.js

# Test with coverage
npm test -- --coverage
```

## 📝 Submitting Changes

### Before You Submit
1. **Sync with upstream:**
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Run tests:**
   ```bash
   npm test
   ```

3. **Format code:**
   ```bash
   npm run format
   npm run lint
   ```

4. **Update documentation:**
   - Update README.md if needed
   - Add code comments
   - Update API docs

### Commit Messages

#### Format
```
<type>(<scope>): <subject>

<body>

<footer>
```

#### Types
- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting)
- **refactor**: Code refactoring
- **perf**: Performance improvements
- **test**: Adding or updating tests
- **chore**: Build/dependency changes

#### Examples
```
feat(chat): add message editing functionality

Allow users to edit previously sent messages and regenerate responses.

Closes #123
```

```
fix(sidebar): resolve mobile layout issue

Fixed sidebar not properly closing on mobile devices when selecting items.

Closes #456
```

```
docs(readme): update installation instructions

Clarify Ollama setup requirements and add troubleshooting section.
```

## 🎯 Pull Request Process

### 1. Create Pull Request

**Title Format:**
```
[Type] Brief description (closes #issue-number)

Examples:
[Feature] Add message editing capability (closes #123)
[Fix] Correct sidebar mobile layout issue (closes #456)
[Docs] Update API documentation
```

### 2. Description Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] New feature
- [ ] Bug fix
- [ ] Documentation update
- [ ] Breaking change

## Related Issues
Closes #(issue)

## Changes Made
- Change 1
- Change 2
- Change 3

## Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed

## Screenshots (if applicable)
Attach before/after screenshots

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex logic
- [ ] Documentation updated
- [ ] Tests added/updated
- [ ] No breaking changes introduced
```

### 3. Code Review

Maintainers will review your PR. Be prepared to:
- Respond to feedback
- Make requested changes
- Discuss design decisions

### 4. Merge

Once approved:
1. Ensure all CI checks pass
2. Squash commits if requested
3. Maintainer will merge PR

## 📋 Coding Standards

### JavaScript/React
```javascript
// Files
- Use .js for services/utils
- Use .jsx for React components
- Use camelCase for file names

// Variables
- const by default
- let for variables that change
- UPPER_SNAKE_CASE for constants

// Functions
- Descriptive names
- Single responsibility
- Return early pattern
- Error handling

// Comments
- Only for "why", not "what"
- Keep comments updated
- Remove debug comments
```

### CSS
```css
/* BEM Naming Convention */
.component { }
.component__element { }
.component--modifier { }

/* Organization */
1. Variables
2. Base styles
3. Component styles
4. Responsive styles
5. Animations

/* Avoid */
- Inline styles
- !important (except resets)
- ID selectors
- Deep nesting
```

### Error Messages
```javascript
// ✅ Good
throw new AppError('Messages field is required', 400);

// ❌ Bad
throw new Error('Error');
```

### Logging
```javascript
// ✅ Good
logger.error(`Failed to stream: ${error.message}`);
logger.info(`Chat session ${sessionId} completed`);

// ❌ Bad
console.log('error');
```

## 🧪 Testing Requirements

### Unit Tests
```javascript
// test/utils/someUtil.test.js
describe('someFunction', () => {
  it('should do something', () => {
    // Arrange
    const input = 'test';
    
    // Act
    const result = someFunction(input);
    
    // Assert
    expect(result).toBe('expected');
  });
});
```

### Coverage Requirements
- New features: 80%+ coverage
- Bug fixes: Add test that fails before fix
- Refactoring: Maintain existing coverage

## 📚 Documentation

### Code Comments
```javascript
/**
 * Function description
 * @param {type} param - Description
 * @returns {type} Description
 */
function myFunction(param) {
  // Complex logic explanation
}
```

### README Updates
- New features should be documented
- API changes documented
- Screenshots for UI changes

### Commit Messages
- Clear, descriptive messages
- Reference issues
- Explain the "why"

## 🔄 Common Workflows

### Adding a New Feature
```bash
# 1. Create feature branch
git checkout -b feature/awesome-feature

# 2. Make changes and commit
git add .
git commit -m "feat(component): add awesome feature"

# 3. Keep branch updated
git fetch upstream
git rebase upstream/main

# 4. Push branch
git push origin feature/awesome-feature

# 5. Create PR on GitHub
```

### Fixing a Bug
```bash
# 1. Create fix branch
git checkout -b fix/bug-description

# 2. Write failing test
# npm test

# 3. Implement fix
# npm run format && npm run lint

# 4. Verify test passes
# npm test

# 5. Push and create PR
git add .
git commit -m "fix(component): resolve issue description"
git push origin fix/bug-description
```

## 🤔 Questions?

- Check existing issues and PRs
- Read documentation files
- Ask in discussions
- Email maintainers

## 📈 Recognition

Contributors are recognized in:
- README.md contributors section
- Release notes
- GitHub contributors page

Thank you for contributing! 🎉
