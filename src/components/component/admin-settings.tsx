"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import {
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialogTrigger,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogFooter,
  AlertDialogContent,
  AlertDialog,
} from "@/components/ui/alert-dialog";

import { MoreHorizontalIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { set } from "zod";

export function AdminSettings() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [permission, setPermission] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [roles, setRoles] = useState([]) as any;
  const [admins, setAdmins] = useState([]) as any;

  // states for update
  const [updateName, setUpdateName] = useState("");
  const [updateEmail, setUpdateEmail] = useState("");
  const [updatePassword, setUpdatePassword] = useState("");
  const [updatePermission, setUpdatePermission] = useState("");
  const [updateId, setUpdateId] = useState("");
  const [updateLoading, setUpdateLoading] = useState(false);

  const fetchAdmins = async () => {
    setFetching(true);
    const res = await fetch("/api/admin");
    const data = await res.json();
    console.log(data);
    setAdmins(data);
    setFetching(false);
  };

  const fetchRoles = async () => {
    try {
      setFetching(true);
      const response = await fetch("/api/roles");
      const data = await response.json();
      setRoles(data);
      setFetching(false);
    } catch (error) {
      setFetching(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAdmins();
    fetchRoles();
  }, []);

  const handleCreateAdmin = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const payload = {
      firstname: name.split(" ")[0] || "",
      lastname: name.split(" ")[1] || "",
      email,
      password,
      role: "admin",
      permission: permission,
      isEmailVerified: true,
      googleAuthToken: email,
    };

    // Save to database
    const res = await fetch("/api/admin", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);

    if (!res.ok) {
      setLoading(false);
      console.error("Failed to create admin");
      toast.error("Failed to create admin");
      return;
    }

    setAdmins([...admins, data.newUser]);
    console.log("Create Admin", payload);
    // reset form
    setName("");
    setEmail("");
    setPassword("");
    setPermission("");
    setLoading(false);
  };

  const handleDeleteAdmin = async (email: string) => {
    try {
      setLoading(true);
      console.log("Delete Admin", email);
      // don't delete the last admin with all permissions
      if (
        admins.length === 1 &&
        admins[0].permission.permissions.length === 5
      ) {
        toast.error("Cannot delete the last admin with all permissions.");
        setLoading(false);
        return;
      }
      const res = await fetch(`/api/admin`, {
        body: JSON.stringify({ email }),
        method: "DELETE",
      });
      const data = await res.json();
      console.log(data);

      setAdmins(admins.filter((admin: any) => admin.email !== email));

      toast.success("Admin has been deleted successfully.");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("Failed to delete admin");
    }
  };

  const handleUpdateAdmin = async () => {
    try {
      setUpdateLoading(true);
      const payload = {
        id: updateId,
        firstname: updateName.split(" ")[0] || "",
        lastname: updateName.split(" ")[1] || "",
        email: updateEmail,
        password: updatePassword === "" ? undefined : updatePassword,
        role: "admin",
        permission: updatePermission,
        isEmailVerified: true,
        googleAuthToken: updateEmail,
      };

      const res = await fetch("/api/admin", {
        method: "PUT",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);

      if (!res.ok) {
        setUpdateLoading(false);
        console.error("Failed to update admin");
        toast.error("Failed to update admin");
        return;
      }

      setAdmins(
        admins.map((admin: any) => {
          if (admin.email === updateEmail) {
            return data;
          }
          return admin;
        })
      );

      toast.success("Admin has been updated successfully.");
      // reset form
      setUpdateName("");
      setUpdateEmail("");
      setUpdatePassword("");
      setUpdatePermission("");
      setUpdateLoading(false);
    } catch (error) {
      setUpdateLoading(false);
      console.log(error);
      toast.error("Failed to update admin");
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <h1 className="text-2xl font-bold mb-6">Admin Settings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-bold mb-4">Add New Admin</h2>
          <form onSubmit={handleCreateAdmin} className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter admin name"
                type="text"
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                required
                value={email}
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter admin email"
                type="email"
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                required
                value={password}
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                type="password"
              />
            </div>
            <div>
              <Label htmlFor="role">Role</Label>
              <Select
                required
                value={permission}
                onValueChange={(value) => setPermission(value)}
                defaultValue="editor"
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  {
                    // Define the permission checkboxes
                    !loading &&
                      roles.map((role: any) => (
                        <SelectItem key={role._id} value={role._id}>
                          {role.role}
                        </SelectItem>
                      ))
                  }
                </SelectContent>
              </Select>
            </div>
            <Button disabled={loading} className="w-full" type="submit">
              {loading ? "Creating Admin..." : "Create Admin"}
            </Button>
          </form>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-4">Existing Admins</h2>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>

                  <TableHead>Role</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {!fetching && admins && admins.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4}>No admins found</TableCell>
                  </TableRow>
                )}
                {fetching && (
                  <TableRow>
                    <TableCell colSpan={4}>Loading...</TableCell>
                  </TableRow>
                )}
                {!fetching &&
                  admins &&
                  admins.length > 0 &&
                  admins.map((admin: any) => (
                    <TableRow key={admin.email}>
                      <TableCell>
                        {admin.firstname + " " + admin.lastname}
                      </TableCell>
                      <TableCell>{admin.email}</TableCell>
                      <TableCell>
                        {admin?.permission ? admin.permission.role : admin.role}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button size="icon" variant="ghost">
                              <MoreHorizontalIcon className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onSelect={(e) => {
                                e.preventDefault();
                                setUpdateName(
                                  admin.firstname + " " + admin.lastname
                                );
                                setUpdateEmail(admin.email);
                                setUpdatePassword("");
                                setUpdatePermission(admin?.permission?._id);
                                setUpdateId(admin._id);
                              }}
                            >
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <p>Edit</p>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>
                                      Edit Admin
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Update the admin details here.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <div className="space-y-4">
                                    <div>
                                      <Label htmlFor="name">Name</Label>
                                      <Input
                                        id="name"
                                        required
                                        value={
                                          updateName ||
                                          admin.firstname + " " + admin.lastname
                                        }
                                        onChange={(e) =>
                                          setUpdateName(e.target.value)
                                        }
                                        placeholder="Enter admin name"
                                        type="text"
                                      />
                                    </div>
                                    <div>
                                      <Label htmlFor="email">Email</Label>
                                      <Input
                                        required
                                        value={updateEmail || admin.email}
                                        id="email"
                                        onChange={(e) =>
                                          setUpdateEmail(e.target.value)
                                        }
                                        placeholder="Enter admin email"
                                        type="email"
                                      />
                                    </div>
                                    <div>
                                      <Label htmlFor="password">Password</Label>
                                      <Input
                                        value={updatePassword}
                                        id="password"
                                        onChange={(e) =>
                                          setUpdatePassword(e.target.value)
                                        }
                                        placeholder="Enter new admin password"
                                        type="password"
                                      />
                                    </div>
                                    <div>
                                      <Label htmlFor="role">Role</Label>
                                      <Select
                                        value={updatePermission}
                                        onValueChange={(value) =>
                                          setUpdatePermission(value)
                                        }
                                        defaultValue={admin?.permission?._id}
                                      >
                                        <SelectTrigger className="w-full">
                                          <SelectValue placeholder="Select role" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          {
                                            // Define the permission checkboxes
                                            !loading &&
                                              roles.map((role: any) => (
                                                <SelectItem
                                                  key={role._id}
                                                  value={role._id}
                                                >
                                                  {role.role}
                                                </SelectItem>
                                              ))
                                          }
                                        </SelectContent>
                                      </Select>
                                    </div>
                                  </div>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>
                                      Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => {
                                        handleUpdateAdmin();
                                      }}
                                    >
                                      {loading
                                        ? "Updating Admin..."
                                        : "Update Admin"}
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onSelect={(e) => {
                                e.preventDefault();
                              }}
                            >
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <p>Delete</p>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>
                                      Delete Admin
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to delete this
                                      admin?
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>
                                      Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() =>
                                        handleDeleteAdmin(admin.email)
                                      }
                                    >
                                      Delete
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
