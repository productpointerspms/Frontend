"use client";

import { useState, type FormEvent } from "react";
import { CircleCheck, CircleMinus, Eye, LockKeyhole, Mail, Pencil, Plus, UserCheck, Users } from "lucide-react";
import { useWorkspaceProfile } from "./AdminShell";
import {
  ActionMenu, AdminMutations, ResourceState, Badge, ChoiceField, DataTable, DetailRows, Dialog, DialogActions, Field, Metric, PageHeading, displayDate,
} from "./AdminUI";
import { adminRoles, type Administrator } from "./ManagementData";
import { useAdminMutation, useAdminResource } from "./admin-api";
import styles from "./admin.module.css";

type InvitedRole = typeof adminRoles[number];
type InviteDetails = { name: string; email: string; role: InvitedRole };
const emptyInvite: InviteDetails = { name: "", email: "", role: "Program Admin" };
const tones = { Active: "green", Invited: "orange", Inactive: "muted" } as const;

function InviteAdministrator({
  all, onClose, onInvite,
}: {
  all: Administrator[];
  onClose: () => void;
  onInvite: (values: InviteDetails, sent: () => void) => void;
}) {
  const [step, setStep] = useState(1);
  const [values, setValues] = useState<InviteDetails>(emptyInvite);
  const [error, setError] = useState("");

  function review(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name")).trim();
    const email = String(form.get("email")).trim().toLowerCase();
    if (!name || all.some((item) => item.email.toLowerCase() === email && (item.status !== "Invited" || item.role !== form.get("role")))) {
      setError(name ? "This address already has an administrator record." : "Enter the administrator’s full name.");
      return;
    }
    setValues({ name, email, role: form.get("role") as InvitedRole });
    setError("");
    setStep(2);
  }

  function send() {
    onInvite(values, () => setStep(3));
  }

  const title = step === 1 ? "Invite Administrator" : step === 2 ? "Review Invitation" : "Invitation Sent";
  return (
    <Dialog title={title} onClose={onClose} wide>
      <div className={styles.dialogBody}>
        <div className={styles.stepIndicator}>
          <p className={styles.infoLabel}>{step === 3 ? "Invitation complete" : `Step ${step} of 2 · ${step === 1 ? "Details" : "Review"}`}</p>
          <div className={styles.stepBar} aria-hidden><span data-complete="true" /><span data-complete={step >= 2} /></div>
        </div>
        {step === 2 && <>
          <p>Check the details before sending the invitation.</p>
          <div className={styles.infoBox}><DetailRows items={[["Full name", values.name], ["Email address", values.email], ["Assigned role", values.role]]} /></div>
          <p className={styles.hint}>The assigned role uses the permissions shown in Roles &amp; Access.</p>
        </>}
        {step === 3 && <>
          <div className={styles.inviteSuccess}><CircleCheck size={25} aria-hidden /><p role="status">The invitation for {values.name} was sent.</p></div>
          <div className={styles.infoBox}><DetailRows items={[["Email address", values.email], ["Assigned role", values.role]]} /></div>
          <p className={styles.hint}>The record stays invited until the recipient verifies their email.</p>
        </>}
      </div>
      {step === 1 && <form method="post" onSubmit={review}>
        <div className={styles.dialogBody}>
          <p className={styles.hint}>Give a team member the appropriate access to ProductPointers.</p>
          <Field label="Full Name">{(id) => <input id={id} name="name" className={styles.control} defaultValue={values.name} placeholder="e.g. Olivia Bennett" required />}</Field>
          <Field label="Email Address">{(id) => <input id={id} name="email" type="email" className={styles.control} defaultValue={values.email} placeholder="olivia@example.com" required />}</Field>
          <ChoiceField label="Role" name="role" options={adminRoles} defaultValue={values.role} />
          {error && <p className={styles.error} role="alert">{error}</p>}
        </div>
        <DialogActions onClose={onClose}><button type="submit" className={styles.primary}>Continue</button></DialogActions>
      </form>}
      {step === 2 && <div className={styles.dialogActions}>
        <button type="button" className={styles.secondary} onClick={() => setStep(1)}>Back</button>
        <button type="button" className={styles.primary} onClick={send}>Send Invitation</button>
      </div>}
      {step === 3 && <div className={styles.dialogActions}>
        <button type="button" className={styles.secondary} onClick={() => { setValues(emptyInvite); setStep(1); }}>Invite Another Admin</button>
        <button type="button" className={styles.primary} onClick={onClose}>Done</button>
      </div>}
    </Dialog>
  );
}

type SettingsData = { admins: Administrator[]; sections: string[]; access: { role: InvitedRole; section: string }[] };

export function Settings() {
  const profile = useWorkspaceProfile();
  const canManage = profile.role === "Super Admin";
  const resource = useAdminResource<SettingsData>("settings");
  const administrators = resource.data?.admins ?? [];
  const access = resource.data?.access ?? [];
  const action = useAdminMutation(resource.reload);
  const [dialog, setDialog] = useState<"invite" | { kind: "profile" | "edit" | "status"; admin: Administrator } | null>(null);
  const close = () => { action.setError(""); setDialog(null); };
  const active = administrators.filter(({ status }) => status === "Active").length;
  const invited = administrators.filter(({ status }) => status === "Invited").length;

  return (
    <ResourceState {...resource}><AdminMutations action={action}>
      <PageHeading title="Settings" description="Manage administrators, invitations and role access." action={canManage &&
        <button type="button" className={styles.primary} onClick={() => setDialog("invite")}><Plus size={17} aria-hidden />Invite Admin</button>
      } />
      <div className={styles.metrics}>
        <Metric label="Total Admins" value={administrators.length} detail="All administrators" icon={Users} />
        <Metric label="Active Admins" value={active} detail="Currently have dashboard access" icon={UserCheck} tone="green" />
        <Metric label="Pending Invitations" value={invited} detail="Awaiting acceptance" icon={Mail} tone="orange" />
      </div>
      <section className={`${styles.panel} ${styles.tablePanel}`} aria-labelledby="all-administrators">
        <div className={styles.panelHeader}><h2 id="all-administrators">All administrators</h2><Badge tone="purple">Managed by Super Admin</Badge></div>
        <DataTable caption="All administrators" headings={["Name", "Email Address", "Role", "Status", "Last Active", "Actions"]}>
          {administrators.map((admin) => <tr key={admin.id}>
            <td><strong>{admin.name}</strong></td><td>{admin.email}</td>
            <td><Badge tone={admin.role === "Super Admin" ? "purple" : "muted"}>{admin.role}</Badge></td>
            <td><Badge tone={tones[admin.status]}>{admin.status}</Badge></td><td>{displayDate(admin.lastActive)}</td>
            <td><ActionMenu label={`Actions for ${admin.name}`} actions={[
              { label: "View Administrator", icon: Eye, onSelect: () => setDialog({ kind: "profile", admin }) },
              ...(!canManage || !adminRoles.some((role) => role === admin.role) ? [] : [
                { label: "Edit Role", icon: Pencil, onSelect: () => setDialog({ kind: "edit", admin }) },
                ...((admin.status === "Invited") ? [] : [{
                  label: admin.status === "Active" ? "Deactivate" : "Activate", icon: admin.status === "Active" ? CircleMinus : CircleCheck,
                  onSelect: () => setDialog({ kind: "status", admin }),
                }]),
              ]),
            ]} /></td>
          </tr>)}
        </DataTable>
      </section>

      <section className={`${styles.panel} ${styles.tablePanel} ${styles.accessPanel}`} aria-labelledby="roles-and-access">
        <div className={styles.panelHeader}>
          <div><h2 id="roles-and-access">Roles &amp; Access</h2><p>Manage which sections each administrator role can access.</p></div>
          <div className={styles.accessLegend}><Badge tone="purple">Access</Badge><Badge>No access</Badge><Badge tone="purple">Locked</Badge></div>
        </div>
        <DataTable caption="Roles and access" headings={["Dashboard section", "Super Admin", ...adminRoles]}>
          {resource.data?.sections.map((section) => <tr key={section}>
            <td>{section}</td>
            <td><span className={styles.locked} role="img" aria-label={`${section}: Super Admin access locked`}><LockKeyhole size={12} aria-hidden /></span></td>
            {adminRoles.map((role) => {
              const checked = access.some((entry) => entry.role === role && entry.section === section);
              return <td key={role}><button type="button" role="switch" aria-label={`${role}: ${section}`}
                aria-checked={checked} disabled={!canManage || action.pending || resource.refreshing} className={styles.toggle}
                onClick={() => void action.save("settings/access", "PATCH", { role, section, enabled: !checked })} /></td>;
            })}
          </tr>)}
        </DataTable>
      </section>
      {dialog === "invite" && <InviteAdministrator all={administrators} onClose={close} onInvite={(values, sent) => {
        void action.save("settings/invitations", "POST", values, sent);
      }} />}
      {dialog && typeof dialog === "object" && dialog.kind === "profile" && <Dialog title={dialog.admin.name}
        description={dialog.admin.email} drawer onClose={close}>
        <div className={styles.dialogBody}>
          <DetailRows items={[["Role", dialog.admin.role], ["Status", dialog.admin.status], ["Last active", displayDate(dialog.admin.lastActive)]]} />
        </div>
      </Dialog>}
      {dialog && typeof dialog === "object" && dialog.kind === "edit" && <Dialog title="Edit Administrator Role" description={dialog.admin.name} onClose={close}>
        <form method="post" onSubmit={(event) => {
          event.preventDefault();
          void action.save("settings/administrators/" + dialog.admin.id, "PATCH", {
            role: new FormData(event.currentTarget).get("role"), active: dialog.admin.status !== "Inactive",
          }, close);
        }}>
          <div className={styles.dialogBody}><ChoiceField label="Role" name="role" options={adminRoles} defaultValue={dialog.admin.role} /></div>
          <DialogActions onClose={close}><button type="submit" className={styles.primary}>Save Changes</button></DialogActions>
        </form>
      </Dialog>}
      {dialog && typeof dialog === "object" && dialog.kind === "status" && <Dialog
        title={dialog.admin.status === "Active" ? "Deactivate administrator?" : "Activate administrator?"} description={dialog.admin.name} onClose={close}>
        <DialogActions onClose={close}><button type="button" className={styles.primary} onClick={() => {
          void action.save("settings/administrators/" + dialog.admin.id, "PATCH", {
            role: dialog.admin.role, active: dialog.admin.status !== "Active",
          }, close);
        }}>{dialog.admin.status === "Active" ? "Deactivate" : "Activate"}</button></DialogActions>
      </Dialog>}
    </AdminMutations></ResourceState>
  );
}
