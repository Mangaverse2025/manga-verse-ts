
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus } from "lucide-react";

interface List {
  id: string;
  name: string;
  isPrivate: boolean;
}

const MOCK_LISTS: List[] = [
  { id: "1", name: "Favorites", isPrivate: false },
  { id: "2", name: "Reading Now", isPrivate: false },
  { id: "3", name: "To Read Later", isPrivate: true },
  { id: "4", name: "Completed", isPrivate: false },
];

interface AddToListDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddToListDialog({ open, onOpenChange }: AddToListDialogProps) {
  const [selectedLists, setSelectedLists] = useState<string[]>([]);

  const handleToggleList = (listId: string) => {
    if (selectedLists.includes(listId)) {
      setSelectedLists(selectedLists.filter(id => id !== listId));
    } else {
      setSelectedLists([...selectedLists, listId]);
    }
  };

  const handleSave = () => {
    console.log("Saved lists:", selectedLists);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add to List</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 my-4">
          {MOCK_LISTS.map((list) => (
            <div key={list.id} className="flex items-center justify-between space-x-2">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id={`list-${list.id}`} 
                  checked={selectedLists.includes(list.id)}
                  onCheckedChange={() => handleToggleList(list.id)}
                />
                <label
                  htmlFor={`list-${list.id}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {list.name}
                </label>
              </div>
              {list.isPrivate && (
                <span className="text-xs text-muted-foreground">Private</span>
              )}
            </div>
          ))}
        </div>
        
        <Button className="w-full flex items-center justify-center gap-2" variant="outline">
          <Plus className="h-4 w-4" />
          Create New List
        </Button>
        
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
