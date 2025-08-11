# Zhihe Restricted Posts

A Flarum extension that allows post authors to mark their posts as restricted content.

## Features

- 🔒 **Post Marking**: Post authors can mark their own posts as restricted
- 🎯 **Visual Indicators**: Lock icon badges appear on restricted posts
- ⚙️ **Post Controls**: Easy mark/unmark via post dropdown menu
- 📝 **Composer Integration**: Checkbox to mark posts as restricted during creation
- 🌐 **Multi-language**: English and Chinese (Simplified) support

## Installation

```bash
composer require zhihe/restricted-posts
php flarum extension:enable zhihe-restricted-posts
php flarum migrate
```

## Usage

### For Post Authors
- Use the "Restricted" checkbox when creating posts
- Mark existing posts via the post dropdown menu (⋮)
- Only post authors can mark/unmark their own posts

### Visual Design
- 🔒 Orange lock badge appears on the right side of post headers
- Works alongside zhihe-primary-posts bookmark badges
- Consistent styling with Flarum's design system

## Integration

This extension is designed to work with:
- **zhihe-money-system**: Provides the `is_restricted` flag for money-based content filtering
- **zhihe-primary-posts**: Compatible badge positioning

## Development

### Building Assets
```bash
cd js/
npm install
npm run build
```

### Requirements
- Flarum 1.8.0+
- PHP 8.1+

## License

MIT License