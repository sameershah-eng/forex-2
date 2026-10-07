export interface Announcement {
  id: number;
  tag: string;
  text: string;
  highlight: string;
  actionText: string;
  linkId: string;
}

export const ANNOUNCEMENTS: Announcement[] = [
  {
    id: 1,
    tag: "QUANTUM EA v5.4",
    text: "Alpha-Grid EA deployed on EUR/USD & GBP/JPY",
    highlight: "89.4% Win Rate (24h)",
    actionText: "View Live Audit",
    linkId: "terminal"
  },
  {
    id: 2,
    tag: "REGULATION",
    text: "Licensed & Authorized by BVI FSC",
    highlight: "License #1024298",
    actionText: "Verify Certificate",
    linkId: "regulation"
  },
  {
    id: 3,
    tag: "INSTANT DEPOSITS",
    text: "Zero-fee crypto deposits enabled across TRC-20 & ERC-20",
    highlight: "0% Network Fee",
    actionText: "Fund Account",
    linkId: "calculator"
  },
  {
    id: 4,
    tag: "RAW SPREADS",
    text: "Direct interbank ECN liquidity with zero markup",
    highlight: "0.0 Pips EUR/USD",
    actionText: "Check Spreads",
    linkId: "features"
  }
];

export interface CurrencyConfig {
  code: string;
  symbol: string;
  rate: number; // relative to USD
}

export const CURRENCIES: CurrencyConfig[] = [
  { code: "USD", symbol: "$", rate: 1.0 },
  { code: "EUR", symbol: "€", rate: 0.92 },
  { code: "GBP", symbol: "£", rate: 0.79 },
  { code: "JPY", symbol: "¥", rate: 154.5 },
  { code: "USDT", symbol: "₮", rate: 1.0 }
];

export interface ProductFeature {
  id: string;
  title: string;
  badge: string;
  tagline: string;
  description: string;
  stats: { label: string; value: string }[];
  imageUrl: string;
  features: string[];
  specs: {
    minDeposit: string;
    maxLeverage: string;
    commission: string;
    execution: string;
  };
}

export const PRODUCT_CARDS: ProductFeature[] = [
  {
    id: "automated-eas",
    title: "Automated EAs",
    badge: "Neural Network Powered",
    tagline: "High-Frequency Algorithmic Matrix",
    description: "Multi-layered algorithmic Expert Advisors designed for MT4 & MT5. Utilizes non-directional grid logic, adaptive ATR volatility filters, and microsecond trade execution.",
    stats: [
      { label: "Historical Win Rate", value: "88.6%" },
      { label: "Max Drawdown Cap", value: "4.8%" },
      { label: "Daily Avg Operations", value: "140+" }
    ],
    imageUrl: "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=800&q=80",
    features: [
      "Machine-learning price trajectory prediction",
      "Dynamic stop-loss adjustment based on order book depth",
      "Full API & Webhook integration for custom backtesting",
      "24/5 Automated risk throttling during news volatility"
    ],
    specs: {
      minDeposit: "$250",
      maxLeverage: "1:500",
      commission: "$0 per lot",
      execution: "2ms Fiber ECN"
    }
  },
  {
    id: "pamm-managed",
    title: "PAMM Managed Accounts",
    badge: "Institutional Pooling",
    tagline: "Passive Institutional Yield Aggregation",
    description: "Percent Allocation Management Module (PAMM) connects institutional liquidity pools with accredited master traders. Automated equity allocation and High-Water Mark profit fees.",
    stats: [
      { label: "AUM Active", value: "$42.8M" },
      { label: "Avg Annual Return", value: "34.2%" },
      { label: "Verified Audits", value: "100% On-Chain" }
    ],
    imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80",
    features: [
      "Strict High-Water Mark fee billing (Performance only)",
      "Daily automated equity distribution to sub-wallets",
      "Complete capital custody retention with zero lock-in",
      "Real-time audited MT5 investor password access"
    ],
    specs: {
      minDeposit: "$1,000",
      maxLeverage: "1:200",
      commission: "15% Performance Fee",
      execution: "Direct Aggregation"
    }
  },
  {
    id: "stock-cfds",
    title: "Stock CFDs",
    badge: "Global Liquidity",
    tagline: "2,400+ International Blue-Chip Equities",
    description: "Trade fractional shares across NASDAQ, NYSE, LSE, and Tokyo Stock Exchange with deep market depth, pre-market trading hours, and instantaneous order routing.",
    stats: [
      { label: "Equities Available", value: "2,400+" },
      { label: "Extended Hours", value: "Yes (Pre/Post)" },
      { label: "Leverage Range", value: "Up to 1:20" }
    ],
    imageUrl: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=800&q=80",
    features: [
      "Instant execution on Apple, Nvidia, Tesla, Microsoft",
      "Direct dividend adjustment credits on long positions",
      "Cross-margin collateral between FX and Stocks",
      "Zero overnight clearing surcharges on unleveraged stock"
    ],
    specs: {
      minDeposit: "$500",
      maxLeverage: "1:20",
      commission: "$0.02 / share",
      execution: "Direct Market Access (DMA)"
    }
  },
  {
    id: "raw-spreads",
    title: "Raw Spreads",
    badge: "Pure ECN Feed",
    tagline: "Institutional Interbank Pricing from 0.0 Pips",
    description: "Direct Tier-1 liquidity streams aggregated from 16 multinational banks. Absolute zero markup, no dealing desk intervention, and transparent tick data history.",
    stats: [
      { label: "EUR/USD Spread", value: "0.0 Pips" },
      { label: "USD/JPY Spread", value: "0.1 Pips" },
      { label: "Fill Ratio", value: "99.98%" }
    ],
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    features: [
      "Cross-connected in Equinix LD4 (London) & NY4 (New York)",
      "True Non-Dealing Desk (NDD) architecture",
      "Scalping, news trading & latency arbitrage fully permitted",
      "Level II Depth of Market (DoM) order book access"
    ],
    specs: {
      minDeposit: "$250",
      maxLeverage: "1:500",
      commission: "$1.50 / side / lot",
      execution: "1.8ms Average"
    }
  }
];

export interface TradeLog {
  id: string;
  time: string;
  symbol: string;
  type: "BUY" | "SELL";
  lots: number;
  openPrice: number;
  closePrice: number;
  pnl: number;
  pips: number;
  agent: "Alpha-Grid v5.4" | "Neural-Momentum v2.1" | "Arbitrage-Flash v3";
  status: "FILLED" | "CLOSED" | "EXECUTING";
  latency: number; // ms
}

export const INITIAL_LOGS: TradeLog[] = [
  {
    id: "TRD-90412",
    time: "10:34:22.180",
    symbol: "EUR/USD",
    type: "BUY",
    lots: 2.5,
    openPrice: 1.08421,
    closePrice: 1.08564,
    pnl: 357.50,
    pips: 14.3,
    agent: "Alpha-Grid v5.4",
    status: "CLOSED",
    latency: 1.8
  },
  {
    id: "TRD-90413",
    time: "10:34:28.450",
    symbol: "GBP/JPY",
    type: "SELL",
    lots: 1.8,
    openPrice: 198.420,
    closePrice: 198.110,
    pnl: 362.80,
    pips: 31.0,
    agent: "Neural-Momentum v2.1",
    status: "CLOSED",
    latency: 2.1
  },
  {
    id: "TRD-90414",
    time: "10:34:35.012",
    symbol: "XAU/USD",
    type: "BUY",
    lots: 1.0,
    openPrice: 2648.20,
    closePrice: 2652.80,
    pnl: 460.00,
    pips: 46.0,
    agent: "Alpha-Grid v5.4",
    status: "CLOSED",
    latency: 1.6
  },
  {
    id: "TRD-90415",
    time: "10:34:41.890",
    symbol: "USD/JPY",
    type: "BUY",
    lots: 3.0,
    openPrice: 154.620,
    closePrice: 154.580,
    pnl: -82.40,
    pips: -4.0,
    agent: "Arbitrage-Flash v3",
    status: "CLOSED",
    latency: 1.9
  },
  {
    id: "TRD-90416",
    time: "10:34:52.341",
    symbol: "EUR/USD",
    type: "SELL",
    lots: 2.0,
    openPrice: 1.08550,
    closePrice: 1.08412,
    pnl: 276.00,
    pips: 13.8,
    agent: "Alpha-Grid v5.4",
    status: "CLOSED",
    latency: 1.7
  },
  {
    id: "TRD-90417",
    time: "10:35:01.120",
    symbol: "BTC/USD",
    type: "BUY",
    lots: 0.5,
    openPrice: 87450.00,
    closePrice: 88120.00,
    pnl: 335.00,
    pips: 67.0,
    agent: "Neural-Momentum v2.1",
    status: "CLOSED",
    latency: 2.4
  }
];

export const REGULATORY_INFO = [
  {
    title: "BVI FSC Regulated",
    identifier: "License #1024298",
    subtitle: "Securities & Investment Business Division",
    description: "Fully licensed by the British Virgin Islands Financial Services Commission under the Securities and Investment Business Act (SIBA). Continuous compliance reporting and strict statutory capitalization ratios.",
    badges: ["SIBA Authorized", "Tier-1 AML/KYC", "Audited Annually"],
    icon: "ShieldCheck"
  },
  {
    title: "Dual Operations Hub",
    identifier: "Austin, TX & BVI",
    subtitle: "Technology Lab & Caribbean Financial Center",
    description: "Algorithmic engineering, low-latency quantum infrastructure, and quantitative model development based in Austin, Texas. Regulatory administration and settlement operations headquartered in Road Town, Tortola.",
    badges: ["Austin Quantum Lab", "BVI Financial Core", "24/5 Operations"],
    icon: "Building2"
  },
  {
    title: "Segregated Client Funds",
    identifier: "Barclays & Standard Chartered",
    subtitle: "Custodial Isolation & Investor Protection",
    description: "100% of retail and institutional client capital is held in segregated custodial accounts at AA-rated tier-1 global banking institutions. Company operational capital is kept completely separate.",
    badges: ["1:1 Reserve Backing", "FSCS Insured Pools", "Zero Rehypothecation"],
    icon: "Lock"
  }
];
