import {
  IconDashboard,
  IconHelp,
  IconHistory,
  IconList,
  IconReport,
  IconSettings,
  IconWorldWww,
} from "@tabler/icons-react"

export const navData = {
  user: {
    name: "Shubham Shinde",
    email: "shubhamshinde225@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: IconDashboard,
    },
    {
      title: "Server API Mappings",
      url: "/server-mapping",
      icon: IconWorldWww,
    },
    {
      title: "Execution History",
      url: "/history",
      icon: IconHistory,
    },
    {
      title: "Running Tasks",
      url: "/tasks",
      icon: IconList,
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "/settings",
      icon: IconSettings,
    },
    {
      title: "About",
      url: "/help",
      icon: IconHelp,
    },
  ],
  documents: [
    {
      name: "Reports",
      url: "/reports",
      icon: IconReport,
    },
  ],
}