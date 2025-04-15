
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  BarChart4, 
  Calendar, 
  CreditCard, 
  Home, 
  MessageSquareText, 
  PiggyBank, 
  Settings, 
  X 
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export const Sidebar = ({ open, onClose }: SidebarProps) => {
  const isMobile = useIsMobile();
  const location = useLocation();
  const currentPath = location.pathname;

  const menuItems = [
    { name: 'Dashboard', path: '/', icon: Home },
    { name: 'Transactions', path: '/transactions', icon: CreditCard },
    { name: 'Analytics', path: '/analytics', icon: BarChart4 },
    { name: 'Bills', path: '/bills', icon: Calendar },
    { name: 'Budgeting', path: '/budgeting', icon: PiggyBank },
    { name: 'AI Assistant', path: '/assistant', icon: MessageSquareText },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return currentPath === path;
    }
    return currentPath.startsWith(path);
  };

  return (
    <aside
      className={`${
        open ? 'translate-x-0' : '-translate-x-full'
      } md:static fixed inset-y-0 left-0 z-50 w-72 bg-sidebar text-sidebar-foreground transition-transform duration-300 ease-in-out md:translate-x-0`}
    >
      <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-6">
        <h2 className="text-xl font-bold">SpendingSense</h2>
        {isMobile && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-sidebar-foreground hover:bg-sidebar-accent"
          >
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>

      <nav className="p-4">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link 
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                  isActive(item.path)
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                    : 'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="absolute bottom-4 w-full px-4">
        <Link 
          to="/settings"
          className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
            isActive('/settings')
              ? 'bg-sidebar-primary text-sidebar-primary-foreground'
              : 'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
          }`}
        >
          <Settings className="h-5 w-5" />
          <span>Settings</span>
        </Link>
      </div>
    </aside>
  );
};
