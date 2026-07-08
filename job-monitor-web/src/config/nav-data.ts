import {
  IconDashboard,
  IconHelp,
  IconHistory,
  IconLayoutDashboard,
  IconList,
  IconReport,
  IconSettings,
  IconWorldWww,
} from "@tabler/icons-react";
import { Calendar, Calendar1Icon, CircleQuestionMark, Globe, History, LayoutDashboard, Settings } from "lucide-react";

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
      icon: LayoutDashboard,
    },
    {
      title: "Server API Mappings",
      url: "/server-mapping",
      icon: Globe,
    },
    {
      title: "Execution History",
      url: "/history",
      icon: History,
    },
    {
      title: "Running Tasks",
      url: "/tasks",
      icon: Calendar,
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
    },
    {
      title: "About",
      url: "/help",
      icon: CircleQuestionMark,
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