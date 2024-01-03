import { Platform } from "react-native";

export default FONTS = {
    FONT_REGULAR: Platform.OS == 'android' ? 'SpaceGrotesk-Regular' : 'SpaceGrotesk-Regular',
    FONT_MEDIUM: Platform.OS == 'android' ? 'SpaceGrotesk-Medium' : 'SpaceGrotesk-Medium',
    FONT_BOLD: Platform.OS == 'android' ? 'SpaceGrotesk-Bold' : 'SpaceGrotesk-Bold',
    FONT_SEMIBOLD: Platform.OS == 'android' ? 'SpaceGrotesk-SemiBold' : 'SpaceGrotesk-SemiBold'
}