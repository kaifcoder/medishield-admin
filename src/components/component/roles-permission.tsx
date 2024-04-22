"use client";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FileEditIcon, TrashIcon } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "../ui/dialog";
import RoleForm from "./role-form";

// Main component
export function RolesPermission() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <PageHeader />
      <RoleTable />
    </main>
  );
}

// Page header component
function PageHeader() {
  return (
    <div className="flex items-center">
      <h1 className="font-semibold text-lg md:text-2xl">Roles & Permissions</h1>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="ml-auto" size="sm">
            Add Role
          </Button>
        </DialogTrigger>
        <DialogContent className="min-w-[800px]" aria-label="Add Role Dialog">
          <RoleForm />
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Role table component
function RoleTable() {
  return (
    <div className="border shadow-sm rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Role</TableHead>
            <TableHead>Orders</TableHead>
            <TableHead>Products</TableHead>
            <TableHead>Brands</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <RoleTableRow roleName="Order Manager" />
          <RoleTableRow roleName="Product Manager" />
        </TableBody>
      </Table>
    </div>
  );
}

// Role table row component
function RoleTableRow({ roleName }: { roleName: string }) {
  return (
    <TableRow>
      <TableCell className="font-medium">{roleName}</TableCell>
      <PermissionCell permissions={["View", "Update", "Cancel", "Export"]} />
      <PermissionCell
        permissions={["View", "Update", "Create", "Delete", "Export"]}
      />
      <PermissionCell permissions={["View", "Add"]} />
      <TableCell>
        <ActionButtons />
      </TableCell>
    </TableRow>
  );
}

// Permission cell component
function PermissionCell(
  props: {
    permissions?: string[];
    setPermissions?: (permissions: string[]) => void;
    handlePermissionChange?: (event: any) => void;
  } = {
    permissions: [],
    setPermissions: () => {},
    handlePermissionChange: () => {},
  }
) {
  const permissions = props.permissions;
  const setPermissions = props.setPermissions || (() => {});

  return (
    <TableCell>
      {permissions?.map((permission) => (
        <div key={permission} className="flex items-center gap-2">
          <Checkbox
            onChange={props.handlePermissionChange}
            value={permission}
            id={`${permission.toLowerCase()}`}
          />
          <Label htmlFor={`${permission.toLowerCase()}`}>{permission}</Label>
        </div>
      ))}
    </TableCell>
  );
}

// Action buttons component
function ActionButtons() {
  return (
    <div className="flex gap-2">
      <IconButton icon={<FileEditIcon />} label="Edit" />
      <IconButton icon={<TrashIcon />} label="Delete" />
    </div>
  );
}

// Icon button component
function IconButton({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <Button size="icon" variant="outline">
      {icon}
      <span className="sr-only">{label}</span>
    </Button>
  );
}

// New role form component

function NewRoleForm() {
  const [roleName, setRoleName] = useState("");
  const [roleDescription, setRoleDescription] = useState("");
  const [permissions, setPermissions] = useState<string[]>([]);

  const handleRoleNameChange = (event: any) => {
    setRoleName(event.target.value);
  };

  const handleRoleDescriptionChange = (event: any) => {
    setRoleDescription(event.target.value);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log({ roleName, roleDescription });
  };

  return (
    <div className="rounded-lg">
      <Card className="">
        <CardHeader>
          <p>Create New Role</p>
          <CardDescription>
            Define the permissions for a new custom role.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="role-name">Role Name</Label>
                <Input
                  id="role-name"
                  placeholder="Enter role name"
                  value={roleName}
                  onChange={handleRoleNameChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role-description">Description</Label>
                <Textarea
                  id="role-description"
                  placeholder="Enter role description"
                  value={roleDescription}
                  onChange={handleRoleDescriptionChange}
                  required
                />
              </div>
            </div>
            <PermissionGrid
              permissions={permissions}
              setPermissions={setPermissions}
            />
          </form>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSubmit} className="ml-auto" type="submit">
            Create Role
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

// Permission grid component
function PermissionGrid(
  props: {
    permissions?: string[];

    setPermissions?: (permissions: string[]) => void;
  } = { permissions: [], setPermissions: () => {} }
) {
  const permissionGroups = [
    { name: "Orders", permissions: ["View", "Update", "Cancel", "Export"] },
    {
      name: "Products",
      permissions: ["View", "Update", "Create", "Delete", "Export"],
    },
    { name: "Brands", permissions: ["View", "Add"] },
  ];

  const handlePermissionChange = (event: any) => {
    const permission = event.target.value;
    if (props.permissions?.includes(permission)) {
      props.setPermissions?.(
        props.permissions?.filter((p) => p !== permission)
      );
    } else {
      props.setPermissions?.([...props?.permissions, permission]);
    }
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      {permissionGroups.map((group) => (
        <div key={group.name} className="space-y-2">
          <Label className="font-semibold">{group.name}</Label>
          <PermissionCell permissions={group.permissions} />
        </div>
      ))}
    </div>
  );
}
