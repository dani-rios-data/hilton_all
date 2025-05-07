export const colors = {
  // Colores primarios
  hiltonBlue: '#002F61',
  turquoise: '#007293',
  teal: '#06937E',
  blueTint: '#686B8C',
  turquoiseTint: '#799CB6',
  tealTint: '#8FB3A7',
  blueShade: '#001137',
  turquoiseShade: '#005670',
  tealShade: '#00614F',
  white: '#FFFFFF',
  black: '#000000',
  hiltonOffWhite: '#F0E9E6',
  
  // Colores para UI
  borderColor: '#E5E7EB',
  inactiveTab: '#6B7280',
  positiveChange: '#059669',
  gridLine: '#E5E7EB',
  
  // Colores específicos para Price/Worth
  priceWorth: {
    hiltonPrice: '#002F61',    // hiltonBlue
    hiltonWorth: '#007293',    // turquoise
    marriottPrice: '#686B8C',  // blueTint
    marriottWorth: '#06937E'   // teal (un tono más fuerte que tealTint)
  },
  
  // Compatibilidad con código existente
  primary: '#002F61', // Mantener compatibilidad
  secondary: '#007293', // Para KeyStatistics, MarketingBudget y CompetitivePositioning
  tertiary: '#06937E', // Para KeyStatistics y MarketingBudget
  accent: '#799CB6', // Para KeyStatistics y MarketingBudget
  hilton: '#002F61', // Para MarketingBudget
  competitors: {
    hilton: '#002F61',
    marriott: '#007293',
    hyatt: '#06937E'
  }
};

export const pieColors = [
  colors.hiltonBlue,
  colors.turquoise, 
  colors.teal,
  colors.blueTint,
  colors.turquoiseTint
];

export default colors;