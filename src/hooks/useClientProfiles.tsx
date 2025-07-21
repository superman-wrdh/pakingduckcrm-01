import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface ClientProfile {
  id: string;
  user_id: string;
  company_name: string;
  contact_name: string;
  email: string;
  phone?: string;
  number_of_projects: number;
  created_at: string;
  updated_at: string;
}

// Interface to match the existing Client interface in ClientsManagement
export interface Client {
  id: string;
  companyName: string;
  contact: string;
  email: string;
  tier: string;
  projectManager: string;
  numberOfOrders: number;
  activityStatus: 'Active' | 'Inactive' | 'Pending';
  affiliate: string;
}

export function useClientProfiles() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Map database profile to Client interface
  const mapProfileToClient = (profile: ClientProfile): Client => ({
    id: profile.id,
    companyName: profile.company_name,
    contact: profile.contact_name,
    email: profile.email,
    tier: "Standard", // Default tier since it's not in the database
    projectManager: "", // Default empty since it's not in the database
    numberOfOrders: profile.number_of_projects,
    activityStatus: "Active" as const, // Default status
    affiliate: "Direct", // Default affiliate
  });

  // Fetch clients from database
  const fetchClients = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('client_profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching clients:', error);
        toast({
          title: "Error",
          description: "Failed to fetch clients",
          variant: "destructive"
        });
        return;
      }

      const mappedClients = data?.map(mapProfileToClient) || [];
      setClients(mappedClients);
    } catch (error) {
      console.error('Error fetching clients:', error);
      toast({
        title: "Error",
        description: "Failed to fetch clients",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Add new client
  const addClient = async (clientData: Omit<ClientProfile, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('client_profiles')
        .insert([clientData])
        .select()
        .single();

      if (error) {
        console.error('Error adding client:', error);
        toast({
          title: "Error",
          description: "Failed to add client",
          variant: "destructive"
        });
        return false;
      }

      const newClient = mapProfileToClient(data);
      setClients(prev => [newClient, ...prev]);
      
      toast({
        title: "Client Added",
        description: `${clientData.company_name} has been added successfully`
      });
      return true;
    } catch (error) {
      console.error('Error adding client:', error);
      toast({
        title: "Error",
        description: "Failed to add client",
        variant: "destructive"
      });
      return false;
    }
  };

  // Update client
  const updateClient = async (clientId: string, updates: Partial<ClientProfile>) => {
    try {
      const { data, error } = await supabase
        .from('client_profiles')
        .update(updates)
        .eq('id', clientId)
        .select()
        .single();

      if (error) {
        console.error('Error updating client:', error);
        toast({
          title: "Error",
          description: "Failed to update client",
          variant: "destructive"
        });
        return false;
      }

      const updatedClient = mapProfileToClient(data);
      setClients(prev => prev.map(client => 
        client.id === clientId ? updatedClient : client
      ));

      toast({
        title: "Client Updated",
        description: `${updatedClient.companyName} has been updated successfully`
      });
      return true;
    } catch (error) {
      console.error('Error updating client:', error);
      toast({
        title: "Error",
        description: "Failed to update client",
        variant: "destructive"
      });
      return false;
    }
  };

  // Delete client
  const deleteClient = async (clientId: string) => {
    try {
      const { error } = await supabase
        .from('client_profiles')
        .delete()
        .eq('id', clientId);

      if (error) {
        console.error('Error deleting client:', error);
        toast({
          title: "Error",
          description: "Failed to delete client",
          variant: "destructive"
        });
        return false;
      }

      setClients(prev => prev.filter(client => client.id !== clientId));
      
      toast({
        title: "Client Deleted",
        description: "Client has been deleted successfully"
      });
      return true;
    } catch (error) {
      console.error('Error deleting client:', error);
      toast({
        title: "Error",
        description: "Failed to delete client",
        variant: "destructive"
      });
      return false;
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return {
    clients,
    loading,
    addClient,
    updateClient,
    deleteClient,
    refetch: fetchClients
  };
}