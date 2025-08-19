export const content = {
  brand: {
    name: "Lossless Casino",
    tagline: "Risk your yield, not your stack.",
    subtitle: "Your principal stays safe. Your yield plays degen games for jackpots."
  },
  
  hero: {
    title: "Risk your yield, not your stack.",
    accentWord: "yield",
    subtitle: "Your principal stays safe. Your yield plays degen games for jackpots.",
    ctas: {
      primary: "Join the List",
      secondary: "Read the Deck"
    },
    trust: [
      { label: "Audited", icon: "shield" },
      { label: "Insurance Vault", icon: "vault" },
      { label: "Built on Solana", icon: "solana" }
    ]
  },
  
  features: [
    {
      title: "Lossless Jackpot Farming",
      description: "Your principal farms. Your yield chases jackpots.",
      icon: "spark"
    },
    {
      title: "Leverage-Only on Yield", 
      description: "Amplify upside; principal stays untouched.",
      icon: "trend"
    },
    {
      title: "PvP Yield Battles",
      description: "Bulls vs Bears. Winner takes the week.",
      icon: "swords"
    }
  ],
  
  whyItWorks: {
    title: "Why it works",
    bullets: [
      "Your principal earns steady yield in blue-chip protocols",
      "Only the yield enters high-risk jackpot games", 
      "Win big or lose small—principal stays protected"
    ],
    sparkline: {
      data: [100, 102, 105, 103, 108, 112, 109, 115, 118, 122, 125],
      label: "Protected principal growth"
    }
  },
  
  flywheel: {
    title: "The Flywheel",
    subtitle: "Self-reinforcing growth cycle",
    steps: [
      { label: "Fees", description: "Protocol revenue from games" },
      { label: "Treasury", description: "Accumulated protocol funds" },
      { label: "Bigger Jackpots", description: "Larger prizes attract more players" },
      { label: "TVL ↑", description: "More deposits, more yield" },
      { label: "More Fees", description: "Cycle repeats with compound growth" }
    ]
  },
  
  roadmap: {
    title: "Roadmap",
    subtitle: "Building the future of lossless gaming",
    phases: [
      {
        phase: "P1",
        title: "Jackpot Farming MVP",
        description: "Core lossless yield farming with basic jackpot mechanics",
        status: "active",
        timeline: "Q1 2024"
      },
      {
        phase: "P2", 
        title: "Multi-game Lobby",
        description: "Add roulette, blackjack, and poker games with yield-based betting",
        status: "upcoming",
        timeline: "Q2 2024"
      },
      {
        phase: "P3",
        title: "Lossless Casino",
        description: "Full casino experience with tournaments and leaderboards", 
        status: "future",
        timeline: "Q3 2024"
      },
      {
        phase: "P4",
        title: "Mobile & Multi-chain",
        description: "Mobile app and expansion to Ethereum, Polygon, and Arbitrum",
        status: "future", 
        timeline: "Q4 2024"
      }
    ]
  },
  
  cta: {
    title: "Join the List",
    subtitle: "Be first to access lossless jackpot farming",
    form: {
      fields: [
        { name: "name", label: "Name", type: "text", required: true },
        { name: "email", label: "Email", type: "email", required: true },
        { name: "wallet", label: "Wallet Address", type: "text", required: false, placeholder: "Optional" }
      ],
      submit: "Join Waitlist"
    }
  },
  
  footer: {
    links: {
      product: [
        { label: "How it Works", href: "#how-it-works" },
        { label: "Roadmap", href: "#roadmap" },
        { label: "Security", href: "/security" }
      ],
      company: [
        { label: "About", href: "/about" },
        { label: "Blog", href: "/blog" },
        { label: "Careers", href: "/careers" }
      ],
      legal: [
        { label: "Terms", href: "/terms" },
        { label: "Privacy", href: "/privacy" },
        { label: "Risk Disclosure", href: "/risk" }
      ]
    },
    social: [
      { platform: "twitter", href: "https://twitter.com/losslesscasino", icon: "twitter" },
      { platform: "discord", href: "https://discord.gg/losslesscasino", icon: "discord" },
      { platform: "github", href: "https://github.com/losslesscasino", icon: "github" }
    ],
    copyright: "© 2024 Lossless Casino. All rights reserved."
  }
} as const;

export type Content = typeof content;