import DashboardLayout from '@/components/layouts/DashboardLayout';
import Card from '@/components/ui/Card';
import { SessionAuth } from '@/components/auth/SessionAuth';
import ClientChatWrapper from '../components/ClientChatWrapper';

export default function Dashboard() {
  return (
    <SessionAuth>
      <DashboardLayout 
        title="Dashboard"
        description="Welcome to your personal dashboard"
      >
        <Card 
          title="AI Chat Integration" 
          description="Test the AI integration by asking questions in the chat below."
        >
          <div className="mt-6 h-[600px] border border-border rounded-lg overflow-hidden">
            <ClientChatWrapper />
          </div>
        </Card>
      </DashboardLayout>
    </SessionAuth>
  );
} 