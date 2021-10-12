const theme = {
  fonts: {
    sizes: {
      xxs: "12px",
      xs: "14px",
      s: "16px",
      base: "18px",
      m: "24px",
    },
    colors: {
      dark: "var(--dark-blue)",
      light: "#FFFFFF",
      formError: "#000000",
    },
  },
  colors: {
    bg: "var(--pale)",
    headerBg: "var(--tangerine)",
    navBg: "var(--orange)",
    logoUnderline: "var(--yellow)",
    iconButton: {
      yellow: "var(--yellow)",
      orange: "var(--orange)",
      tangerine: "var(--tangerine)",
      pale: "var(--pale)",
      darkBlue: "var(--dark-blue)",
      turqoise: "var(--turqoise)",
      paleBlue: "var(--pale-blue)",
    },
    navButton: {
      underline: "var(--tangerine)",
      underlineActive: "#FFFFFF",
    },
    loginForm: {
      bg: "var(--pale-blue)",
      inactiveButtonBg: "var(--turqoise)",
      hoveredButtonBg: "var(--tangerine)",
      mainColor: "#000000",
    },
    input: {
      bg: "#FFFFFF",
      underlineColor: "var(--yellow)",
      placeholderColor: "var(--darker-pale-blue)",
      textColor: "var(--dark-blue)",
    },
    button: {
      textColor: "#FFFFFF",
      bg: "var(--orange)",
      hoveredBg: "var(--dark-blue)",
    },
  },
  borders: {
    thiner: "3px",
    thin: "4px",
    medium: "6px",
    thick: "8px",
  },
  paddings: {
    navPadding: "var(--nav-padding)",
  },
} as const;

export default theme;

export type ThemeType = typeof theme;
