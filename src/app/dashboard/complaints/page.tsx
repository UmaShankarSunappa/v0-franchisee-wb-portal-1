"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Plus, Eye, Filter, XCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

interface ActivityLog {
  timestamp: string
  status: string
  comment?: string
  updatedBy: string
}

interface Complaint {
  id: string
  ticketId: string
  department: string
  subject: string
  dateRaised: string
  status: string
  activityLog: ActivityLog[]
}

const mockComplaints: Complaint[] = [
  {
    id: "1",
    ticketId: "TKT-2024-001",
    department: "Warehouse",
    subject: "Delayed delivery of order ORD-2024-001",
    dateRaised: "2024-01-15",
    status: "In Progress",
    activityLog: [
      {
        timestamp: "2024-01-15T09:00:00",
        status: "Open",
        comment: "Complaint raised by user",
        updatedBy: "You"
      },
      {
        timestamp: "2024-01-15T14:30:00",
        status: "In Progress",
        comment: "We are investigating the delay with the logistics team. Expected resolution within 24 hours.",
        updatedBy: "Warehouse Team"
      }
    ]
  },
  {
    id: "2",
    ticketId: "TKT-2024-002",
    department: "Accounts",
    subject: "Payment not reflected in account",
    dateRaised: "2024-01-18",
    status: "Awaiting Your Response",
    activityLog: [
      {
        timestamp: "2024-01-18T10:15:00",
        status: "Open",
        comment: "Complaint raised by user",
        updatedBy: "You"
      },
      {
        timestamp: "2024-01-18T15:00:00",
        status: "In Progress",
        comment: "Reviewing payment records. Could you please provide the transaction reference number?",
        updatedBy: "Accounts Team"
      },
      {
        timestamp: "2024-01-19T09:00:00",
        status: "Awaiting Your Response",
        comment: "We need additional information to proceed with this complaint.",
        updatedBy: "Accounts Team"
      }
    ]
  },
  {
    id: "3",
    ticketId: "TKT-2024-003",
    department: "EDP",
    subject: "POS system login issue",
    dateRaised: "2024-01-10",
    status: "Closed",
    activityLog: [
      {
        timestamp: "2024-01-10T08:00:00",
        status: "Open",
        comment: "Complaint raised by user",
        updatedBy: "You"
      },
      {
        timestamp: "2024-01-10T10:30:00",
        status: "In Progress",
        comment: "IT team is working on resetting your credentials.",
        updatedBy: "EDP Team"
      },
      {
        timestamp: "2024-01-10T14:00:00",
        status: "Closed",
        comment: "Issue resolved. Credentials have been reset and sent to your email. Please try logging in again.",
        updatedBy: "EDP Team"
      }
    ]
  },
]

export default function ComplaintsPage() {
  const { toast } = useToast()
  const router = useRouter()
  const [complaints, setComplaints] = useState<Complaint[]>(mockComplaints)
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [viewDialogOpen, setViewDialogOpen] = useState(false)
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null)
  const [filterDepartment, setFilterDepartment] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")

  const [complaintForm, setComplaintForm] = useState({
    storeId: "",
    department: "",
    subject: "",
    description: "",
  })

  const handleCreateComplaint = () => {
    if (!complaintForm.storeId || !complaintForm.department || !complaintForm.subject || !complaintForm.description) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Complaint submitted",
      description: "Your complaint has been submitted successfully",
    })

    setCreateDialogOpen(false)
    setComplaintForm({
      storeId: "",
      department: "",
      subject: "",
      description: "",
    })
  }

  const handleViewComplaint = (complaintId: string) => {
    const complaint = complaints.find(c => c.id === complaintId)
    if (complaint) {
      setSelectedComplaint(complaint)
      setViewDialogOpen(true)
    }
  }

  const handleWithdrawComplaint = (complaintId: string) => {
    const complaint = complaints.find(c => c.id === complaintId)
    if (!complaint) return

    if (complaint.status === "Closed" || complaint.status === "Withdrawn") {
      toast({
        title: "Cannot withdraw",
        description: "This complaint has already been closed or withdrawn",
        variant: "destructive",
      })
      return
    }

    // Update complaint status to withdrawn
    setComplaints(prev => prev.map(c => 
      c.id === complaintId 
        ? { 
            ...c, 
            status: "Withdrawn",
            activityLog: [
              ...c.activityLog,
              {
                timestamp: new Date().toISOString(),
                status: "Withdrawn",
                comment: "Complaint withdrawn by user",
                updatedBy: "You"
              }
            ]
          }
        : c
    ))

    toast({
      title: "Complaint withdrawn",
      description: "Your complaint has been successfully withdrawn",
    })
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "open":
        return "bg-blue-100 text-blue-800"
      case "in progress":
        return "bg-yellow-100 text-yellow-800"
      case "awaiting your response":
        return "bg-orange-100 text-orange-800"
      case "closed":
        return "bg-green-100 text-green-800"
      case "withdrawn":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-cyan-900">Complaints</h1>
          <p className="text-gray-600 mt-2">Track and manage your support tickets</p>
        </div>
        <Button onClick={() => setCreateDialogOpen(true)} className="bg-cyan-800 hover:bg-cyan-900">
          <Plus className="h-4 w-4 mr-2" />
          Raise a New Complaint
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-cyan-900">
            <Filter className="h-5 w-5 inline mr-2" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="filterDepartment">Department</Label>
              <Select value={filterDepartment} onValueChange={setFilterDepartment}>
                <SelectTrigger id="filterDepartment">
                  <SelectValue placeholder="All departments" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="operations">Operations</SelectItem>
                  <SelectItem value="warehouse">Warehouse</SelectItem>
                  <SelectItem value="infra">Infra</SelectItem>
                  <SelectItem value="edp">EDP</SelectItem>
                  <SelectItem value="accounts">Accounts</SelectItem>
                  <SelectItem value="pos">POS</SelectItem>
                  <SelectItem value="supply-chain">Supply Chain</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="filterStatus">Status</Label>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger id="filterStatus">
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="awaiting">Awaiting Your Response</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Complaints Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-cyan-900">Your Complaints</CardTitle>
          <CardDescription>All submitted tickets and their current status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ticket ID</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Date Raised</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {complaints.map((complaint) => (
                  <TableRow key={complaint.id}>
                    <TableCell className="font-medium">{complaint.ticketId}</TableCell>
                    <TableCell>{complaint.department}</TableCell>
                    <TableCell>{complaint.subject}</TableCell>
                    <TableCell>{new Date(complaint.dateRaised).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(complaint.status)} variant="secondary">
                        {complaint.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm" onClick={() => handleViewComplaint(complaint.id)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleWithdrawComplaint(complaint.id)}
                          disabled={complaint.status === "Closed" || complaint.status === "Withdrawn"}
                        >
                          <XCircle className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* View Complaint Dialog - Activity Timeline */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Activity Timeline</DialogTitle>
            <DialogDescription>Track the progress of your complaint</DialogDescription>
          </DialogHeader>
          {selectedComplaint && (
            <div className="space-y-6 py-4">
              {/* Complaint Header Info */}
              <div className="p-4 bg-muted rounded-lg space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-sm text-muted-foreground">Ticket ID</p>
                    <p className="font-bold text-lg">{selectedComplaint.ticketId}</p>
                  </div>
                  <Badge className={getStatusColor(selectedComplaint.status)} variant="secondary">
                    {selectedComplaint.status}
                  </Badge>
                </div>
                <div>
                  <p className="font-semibold text-sm text-muted-foreground">Subject</p>
                  <p className="font-medium">{selectedComplaint.subject}</p>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div>
                    <p className="font-semibold text-sm text-muted-foreground">Department</p>
                    <p>{selectedComplaint.department}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-muted-foreground">Date Raised</p>
                    <p>{new Date(selectedComplaint.dateRaised).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>

              {/* Activity Timeline */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Activity Log</h3>
                <div className="relative space-y-4 pl-6 border-l-2 border-muted">
                  {(selectedComplaint.activityLog || []).map((activity, index) => (
                    <div key={index} className="relative pb-4">
                      {/* Timeline dot */}
                      <div className="absolute -left-[25px] top-1 h-4 w-4 rounded-full bg-cyan-800 border-2 border-background" />
                      
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <Badge className={getStatusColor(activity.status)} variant="secondary">
                            {activity.status}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {new Date(activity.timestamp).toLocaleString()}
                          </span>
                        </div>
                        
                        {activity.comment && (
                          <div className="mt-2 p-3 bg-muted rounded-md">
                            <p className="text-sm">{activity.comment}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              - {activity.updatedBy}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={() => setViewDialogOpen(false)} className="flex-1 bg-cyan-800 hover:bg-cyan-900">
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Create Complaint Dialog */}
      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Raise a New Complaint</DialogTitle>
            <DialogDescription>Submit a support ticket to the relevant department</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="storeId">Store ID *</Label>
              <Select
                value={complaintForm.storeId}
                onValueChange={(value) => setComplaintForm({ ...complaintForm, storeId: value })}
              >
                <SelectTrigger id="storeId">
                  <SelectValue placeholder="Select store" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="store1">Store 1 - Mumbai Main</SelectItem>
                  <SelectItem value="store2">Store 2 - Mumbai East</SelectItem>
                  <SelectItem value="store3">Store 3 - Pune</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="department">Department *</Label>
              <Select
                value={complaintForm.department}
                onValueChange={(value) => setComplaintForm({ ...complaintForm, department: value })}
              >
                <SelectTrigger id="department">
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="operations">Operations</SelectItem>
                  <SelectItem value="warehouse">Warehouse</SelectItem>
                  <SelectItem value="infra">Infra</SelectItem>
                  <SelectItem value="edp">EDP (IT/Technical)</SelectItem>
                  <SelectItem value="accounts">Accounts</SelectItem>
                  <SelectItem value="pos">POS (Point of Sale)</SelectItem>
                  <SelectItem value="supply-chain">Supply Chain</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Subject *</Label>
              <Input
                id="subject"
                placeholder="Brief title of your complaint"
                value={complaintForm.subject}
                onChange={(e) => setComplaintForm({ ...complaintForm, subject: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                placeholder="Detailed explanation of the issue"
                rows={5}
                value={complaintForm.description}
                onChange={(e) => setComplaintForm({ ...complaintForm, description: e.target.value })}
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button onClick={handleCreateComplaint} className="flex-1 bg-cyan-800 hover:bg-cyan-900">
                Submit Complaint
              </Button>
              <Button onClick={() => setCreateDialogOpen(false)} variant="outline" className="flex-1">
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}