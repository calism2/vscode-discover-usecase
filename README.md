# UseCase Discovery

A Visual Studio Code extension that helps developers discover and analyze UseCaseHandler implementations in their Java codebase.

## Features

- **Discover Use Cases**: Automatically finds and lists all UseCaseHandler implementations in your Java project
- **Cache Management**: Maintains a cache of discovered use cases for quick access
- **Refresh Cache**: Manually refresh the use case discovery cache when needed

## Requirements

- Visual Studio Code version 1.101.0 or higher
- Java project with UseCaseHandler implementations

## Installation

1. Open VS Code
2. Go to the Extensions view (Ctrl+Shift+X / Cmd+Shift+X)
3. Search for "UseCase Discovery"
4. Click Install

## Usage

The extension provides two main commands:

1. **Discover Use Cases**

   - Command: `usecase-discovery.discoverUseCases`
   - This command will scan your Java codebase for UseCaseHandler implementations
   - Results will be displayed in a dedicated view

2. **Refresh Cache**
   - Command: `usecase-discovery.refreshCache`
   - Use this command to manually refresh the use case discovery cache
   - Helpful when you've made changes to your codebase

## Extension Settings

This extension contributes the following settings:

- `usecase-discovery.enable`: Enable/disable the extension
- `usecase-discovery.cacheRefreshInterval`: Set the interval (in minutes) for automatic cache refresh

## Known Issues

- None reported yet

## Release Notes

### 0.0.1

- Initial release
- Basic use case discovery functionality
- Cache management system

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## For more information

- [Visual Studio Code Extension API](https://code.visualstudio.com/api)
- [Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)

**Enjoy!**
