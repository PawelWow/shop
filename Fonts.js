import * as Font from 'expo-font';

export const FONT_OPEN_SANS_REGULAR = 'open-sans';
export const FONT_OPEN_SANS_BOLD = 'open-sans-bold';

export const fetchFonts = () => {
    return Font.loadAsync({
        'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
        'open-sans': require('./assets/fonts/OpenSans-Regular.ttf')
    });
};