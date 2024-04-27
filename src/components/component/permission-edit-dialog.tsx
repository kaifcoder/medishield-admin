"use client";

import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { DialogClose } from "../ui/dialog";
import { toast } from "sonner";

type Props = {
  permission: any;
  roles: any;
  setRoles: any;
  permissionCheckboxes: any;
};

const PermissionEditDialog = ({
  roles,
  permission,
  setRoles,
  permissionCheckboxes,
}: Props) => {
  const [permissions, setPermissions] = useState(permission.permissions) as any;
  const [role, setRole] = useState(permission.role) as any; // Add type annotation

  const [loading, setLoading] = useState(false) as any;
  const [description, setDescription] = useState(permission.description) as any; // Add type annotation

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (role === "Super Admin") {
      alert("You cannot edit the Super Admin role");
      return;
    }

    const roleData = {
      id: permission._id,
      role: role,
      description: description,
      permissions: permissions,
    };

    const response = await fetch("/api/roles", {
      method: "PUT",
      body: JSON.stringify(roleData),
    });

    const data = await response.json();

    console.log(data);
    if (data.error) {
      alert(data.error);
      return;
    }
    toast.success("Role updated successfully");

    // Update the roles state
    window.location.reload();
  };

  return (
    <div className="border rounded-lg p-6 md:p-8">
      <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">
        Edit Role ({permission.role})
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
                <div key={perm.code} className="flex items-center space-x-2">
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
        <DialogClose>
          <Button className="ml-auto" type="submit">
            Update Role
          </Button>
        </DialogClose>
      </form>
    </div>
  );
};

export default PermissionEditDialog;
