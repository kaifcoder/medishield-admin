"use client";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "../ui/badge";
import { useEffect, useState } from "react";
import { FileEditIcon, Trash } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import PermissionEditDialog from "./permission-edit-dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { toast } from "sonner";

export function PermissionsScreen() {
  // Define Constants permission enum codes
  const permissionsCodes = {
    MANAGE_ACCOUNTS: "manage_accounts",
    MANAGE_PRODUCTS: "manage_products",
    MANAGE_ORDERS: "manage_orders",
    MANAGE_BRANDS: "manage_brands",
    MANAGE_ROLES: "manage_roles",
  };

  const permissionCheckboxes = [
    {
      code: permissionsCodes.MANAGE_ACCOUNTS,
      label: "Manage Accounts",
    },
    {
      code: permissionsCodes.MANAGE_PRODUCTS,
      label: "Manage Products",
    },
    {
      code: permissionsCodes.MANAGE_ORDERS,
      label: "Manage Orders",
    },
    {
      code: permissionsCodes.MANAGE_BRANDS,
      label: "Manage Brands",
    },
    {
      code: permissionsCodes.MANAGE_ROLES,
      label: "Manage Roles",
    },
  ];

  // Define the state variables

  const [permissions, setPermissions] = useState([]) as any;
  const [loading, setLoading] = useState(false) as any;
  const [description, setDescription] = useState("");
  const [role, setRole] = useState("");
  const [roles, setRoles] = useState([]) as any;

  const fetchRoles = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/roles");
      const data = await response.json();
      setRoles(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);
  const handleDeletePermission = async (id: any, role: any) => {
    try {
      if (role === "Super Admin") {
        console.log("Super Admin cannot be deleted");
        toast("Super Admin cannot be deleted", {
          description: "The Super Admin role cannot be deleted.",
          closeButton: true,
          position: "top-center",
        });
        return;
      }
      setLoading(true);
      const response = await fetch(`/api/roles/`, {
        body: JSON.stringify({ id: id }),
        method: "DELETE",
      });
      const data = await response.json();
      console.log(data);
      setRoles(roles.filter((role: any) => role._id !== id));
      toast("Role deleted", {
        description: "The role has been deleted successfully.",
        closeButton: true,
        position: "top-center",
      });
      setLoading(false);
    } catch (error) {
      console.log("error occured");
      setLoading(false);
      toast("Error occured", {
        description:
          "There was an error deleting the role. Either the role does not exist or it is Associated with a user.",
        closeButton: true,
        position: "top-center",
      });
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const roleData = {
      role: role,
      description: description,
      permissions: permissions,
    };

    const response = await fetch("/api/roles", {
      method: "POST",
      body: JSON.stringify(roleData),
    });

    const data = await response.json();

    console.log(data);
    setRoles([...roles, data]);

    console.log(roleData);
  };

  return (
    <div className="container px-4 md:px-6 py-6 md:py-12">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <div className="flex items-center justify-between mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl font-bold">
              Roles & Permissions
            </h1>
          </div>
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Role</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Permissions</TableHead>
                  <TableHead className="w-[100px]" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading && (
                  <TableRow>
                    <TableCell colSpan={4}>Loading...</TableCell>
                  </TableRow>
                )}
                {
                  // Define the roles
                  !loading &&
                    roles.map((role: any) => (
                      <TableRow key={role.role}>
                        <TableCell className="font-medium">
                          {role.role}
                        </TableCell>
                        <TableCell>{role.description}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-2">
                            {role.permissions.map((perm: any) => (
                              <Badge key={perm} variant="outline">
                                {perm}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div
                            className="flex items-center space-x-2"
                            role="group"
                          >
                            <Dialog>
                              <DialogTrigger>
                                <Button size="icon" variant="ghost">
                                  <FileEditIcon className="h-4 w-4" />
                                  <span className="sr-only">Edit</span>
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <PermissionEditDialog
                                  permission={role}
                                  roles={roles}
                                  setRoles={setRoles}
                                  permissionCheckboxes={permissionCheckboxes}
                                />
                              </DialogContent>
                            </Dialog>
                            <AlertDialog>
                              <AlertDialogTrigger>
                                <Button size="icon" variant="destructive">
                                  <Trash className="h-4 w-4" />
                                  <span className="sr-only">Delete</span>
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <div>
                                  <h2 className="text-lg font-bold mb-4">
                                    Delete Role
                                  </h2>
                                  <p className="mb-4">
                                    Are you sure you want to delete the role{" "}
                                    <strong>{role.role}</strong>?
                                  </p>
                                </div>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() =>
                                      handleDeletePermission(
                                        role._id,
                                        role.role
                                      )
                                    }
                                  >
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                }
              </TableBody>
            </Table>
          </div>
        </div>
        <div className="border rounded-lg p-6 md:p-8">
          <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">
            Add New Role
          </h2>
          <form onSubmit={handleSubmit} className="grid gap-4 md:gap-6">
            <div className="grid gap-2">
              <Label htmlFor="role-name">Role Name</Label>
              <Input
                value={role}
                onChange={(e) => setRole(e.target.value)}
                id="role-name"
                placeholder="Enter role name"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="role-description">Description</Label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                id="role-description"
                placeholder="Enter role description"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="role-permissions">Permissions</Label>
              <div className="grid gap-2">
                {
                  // Define the permission checkboxes
                  permissionCheckboxes.map((perm: any) => (
                    <div
                      key={perm.code}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        value={perm.code}
                        id={perm.code}
                        checked={permissions.includes(perm.code)} // Add type annotation
                        onCheckedChange={(checked: any) => {
                          setPermissions(
                            checked
                              ? [...permissions, perm.code]
                              : permissions.filter((p: any) => p !== perm.code)
                          );
                        }}
                      />
                      <Label htmlFor={perm.code}>{perm.label}</Label>
                    </div>
                  ))
                }
              </div>
            </div>
            <Button className="ml-auto" type="submit">
              Save Role
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
