# Hilton Dashboard

A data visualization dashboard for Hilton marketing and brand performance metrics built with React, TypeScript, and Vite.

## Features

- Interactive visualizations of brand awareness and consideration metrics
- Brand spend analysis by marketing channel
- "For The Stay" campaign recall metrics
- Price vs. Worth perception analysis by demographic
- Proof of Point key metrics and insights

## Technology Stack

- React with TypeScript
- Vite for fast development and building
- Recharts for data visualization
- TailwindCSS for styling
- PapaParse for CSV data processing

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/dani-rios-data/hilton_dashboard.git
cd hilton_dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173` (or the port shown in your terminal).

## CSV Data Sources

The dashboard uses the following CSV files (located in the `/public` directory):

- `hilton_spend_by_brand.csv` - Marketing spend by brand and channel
- `final_consideration.csv` - Brand consideration metrics
- `final_unaided_awareness.csv` - Unaided brand awareness metrics
- `fts_association_communication_recall.csv` - "For The Stay" campaign recall data
- `price_worth_by_generation.csv` - Price/value perception by generation
- `hilton_proof_of_point.csv` - Key proof points and performance metrics

## Deployment

This project is configured for deployment with Vercel. Simply connect your Vercel account to the GitHub repository for automatic deployments.

## License

This project is private and proprietary to Hilton. 