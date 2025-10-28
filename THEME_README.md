# Theme System Documentation

This app includes a comprehensive dark and light mode theme system.

## Features

- ✅ Light Mode
- ✅ Dark Mode
- ✅ Auto Mode (follows system preferences)
- ✅ Persistent theme storage using AsyncStorage
- ✅ Consistent color palette across the app
- ✅ Easy theme switching via settings

## Theme Colors

### Light Theme
- Background: `#ffffff`
- Text: `#1a1a1a`
- Card: `#f9f9f9`
- Border: `#e5e5e5`
- Primary: `#ff7819`
- Secondary: `#151312`
- Accent: `#AB8BFF`

### Dark Theme
- Background: `#0f0d23`
- Text: `#f5f5f5`
- Card: `#1a1a2a`
- Border: `#2a2a40`
- Primary: `#ff9147`
- Secondary: `#ffffff`
- Accent: `#AB8BFF`

## Usage

### Using Theme in Components

```typescript
import { useTheme } from "../context/ThemeContext";

function MyComponent() {
  const { theme, colors } = useTheme();
  
  return (
    <View style={{ backgroundColor: colors.background }}>
      <Text style={{ color: colors.text }}>Hello World</Text>
    </View>
  );
}
```

### Available Theme Properties

- `theme`: Current theme value ("light" | "dark")
- `mode`: Current mode setting ("light" | "dark" | "auto")
- `setMode`: Function to change the theme mode
- `toggleTheme`: Function to toggle between light and dark
- `colors`: Object containing all theme colors

### Changing Theme Mode

```typescript
import { useTheme } from "../context/ThemeContext";

function SettingsScreen() {
  const { setMode } = useTheme();
  
  return (
    <Button onPress={() => setMode("dark")} title="Dark Mode" />
    <Button onPress={() => setMode("light")} title="Light Mode" />
    <Button onPress={() => setMode("auto")} title="Auto Mode" />
  );
}
```

## Files Structure

- `context/ThemeContext.tsx` - Theme provider and context
- `app/_layout.tsx` - Root layout with ThemeProvider
- `app/index.tsx` - Home page with theme support
- `app/(tabs)/_layout.tsx` - Tab layout with themed tab bar
- `app/(tabs)/card.tsx` - Card screen with theme support
- `app/settings.tsx` - Settings screen with theme controls

## Installation

The theme system requires the following dependency:

```bash
npm install @react-native-async-storage/async-storage
```

This is already installed in the project.

## Persistence

The theme preference is automatically saved to AsyncStorage and restored when the app restarts.

Storage Key: `@app_theme_mode`

## Status Bar

The status bar automatically adjusts based on the current theme (light text on dark theme, dark text on light theme).

## Future Enhancements

- Custom color schemes
- Theme-specific fonts
- Animated theme transitions
- Per-screen theme overrides

