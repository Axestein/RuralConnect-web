// // src/app/officer/complaints/board/page.tsx
// 'use client';

// import { useState, useEffect, useRef } from 'react';
// import {
//   Plus,
//   Filter,
//   Search,
//   MoreVertical,
//   Users,
//   Calendar,
//   AlertTriangle,
//   CheckCircle,
//   Clock,
//   XCircle,
//   GripVertical,
//   Trash2,
//   MapPin,
//   Camera,
//   MessageSquare,
//   ChevronRight
// } from 'lucide-react';
// import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, closestCorners } from '@dnd-kit/core';
// import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';
// import { useSortable } from '@dnd-kit/sortable';
// import { CSS } from '@dnd-kit/utilities';

// // Install dependencies first:
// // npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities

// type ComplaintStatus = 'pending' | 'in-progress' | 'resolved' | 'rejected';

// interface Complaint {
//   id: string;
//   title: string;
//   description: string;
//   category: string;
//   status: ComplaintStatus;
//   priority: 'low' | 'medium' | 'high';
//   createdAt: string;
//   updatedAt: string;
//   assignedTo?: string;
//   userName: string;
//   userPhone: string;
//   images: string[];
//   location: {
//     address: string;
//     village: string;
//     district: string;
//     lat: number;
//     lng: number;
//   };
// }

// interface Column {
//   id: ComplaintStatus;
//   title: string;
//   color: string;
//   icon: React.ReactNode;
//   count: number;
// }

// // Draggable Complaint Card Component
// function DraggableComplaintCard({ complaint }: { complaint: Complaint }) {
//   const {
//     attributes,
//     listeners,
//     setNodeRef,
//     transform,
//     transition,
//     isDragging
//   } = useSortable({ id: complaint.id });

//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//     opacity: isDragging ? 0.5 : 1,
//   };

//   const getPriorityColor = (priority: string) => {
//     switch (priority) {
//       case 'high': return 'bg-red-100 text-red-800';
//       case 'medium': return 'bg-yellow-100 text-yellow-800';
//       case 'low': return 'bg-green-100 text-green-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const getCategoryIcon = (category: string) => {
//     const icons: Record<string, string> = {
//       'pothole': '🛣️',
//       'sanitation': '🗑️',
//       'water': '💧',
//       'electricity': '⚡',
//       'drainage': '🚰',
//       'street-light': '💡',
//       'other': '❓'
//     };
//     return icons[category] || '📌';
//   };

//   return (
//     <div
//       ref={setNodeRef}
//       style={style}
//       className="bg-white rounded-lg shadow-sm border border-gray-200 mb-3 hover:shadow-md transition-shadow"
//     >
//       <div className="p-4">
//         {/* Drag handle and header */}
//         <div className="flex items-start justify-between mb-3">
//           <div className="flex items-center space-x-2">
//             <button
//               {...attributes}
//               {...listeners}
//               className="text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing"
//             >
//               <GripVertical className="h-5 w-5" />
//             </button>
//             <span className="text-xl">{getCategoryIcon(complaint.category)}</span>
//           </div>
          
//           <div className="flex items-center space-x-2">
//             <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(complaint.priority)}`}>
//               {complaint.priority}
//             </span>
//             <button className="text-gray-400 hover:text-gray-600">
//               <MoreVertical className="h-5 w-5" />
//             </button>
//           </div>
//         </div>

//         {/* Complaint content */}
//         <div>
//           <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">
//             {complaint.title}
//           </h4>
//           <p className="text-sm text-gray-600 mb-3 line-clamp-2">
//             {complaint.description}
//           </p>
//         </div>

//         {/* Metadata */}
//         <div className="space-y-2">
//           <div className="flex items-center text-xs text-gray-500">
//             <Users className="h-3 w-3 mr-1" />
//             <span className="truncate">{complaint.userName}</span>
//           </div>
          
//           <div className="flex items-center text-xs text-gray-500">
//             <MapPin className="h-3 w-3 mr-1" />
//             <span className="truncate">{complaint.location.village}</span>
//           </div>

//           <div className="flex items-center justify-between text-xs text-gray-500">
//             <div className="flex items-center">
//               <Calendar className="h-3 w-3 mr-1" />
//               {new Date(complaint.createdAt).toLocaleDateString()}
//             </div>
//             {complaint.images.length > 0 && (
//               <div className="flex items-center">
//                 <Camera className="h-3 w-3 mr-1" />
//                 {complaint.images.length}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Action buttons */}
//         <div className="mt-4 pt-3 border-t border-gray-100">
//           <div className="flex justify-between items-center">
//             <button className="text-xs text-blue-600 hover:text-blue-800 flex items-center">
//               <MessageSquare className="h-3 w-3 mr-1" />
//               Message
//             </button>
//             <button className="text-xs px-3 py-1 bg-blue-50 text-blue-600 rounded hover:bg-blue-100">
//               Assign
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Column Component
// function Column({
//   column,
//   complaints,
//   onAddComplaint,
//   onDeleteComplaint
// }: {
//   column: Column;
//   complaints: Complaint[];
//   onAddComplaint: (status: ComplaintStatus) => void;
//   onDeleteComplaint: (id: string) => void;
// }) {
//   return (
//     <div className="bg-gray-50 rounded-xl p-4 h-full">
//       {/* Column header */}
//       <div className="flex items-center justify-between mb-4">
//         <div className="flex items-center space-x-2">
//           <div className={`p-2 rounded-lg ${column.color}`}>
//             {column.icon}
//           </div>
//           <div>
//             <h3 className="font-semibold text-gray-900">{column.title}</h3>
//             <p className="text-sm text-gray-500">{column.count} complaints</p>
//           </div>
//         </div>
//         <button
//           onClick={() => onAddComplaint(column.id)}
//           className="p-2 text-gray-400 hover:text-gray-600"
//         >
//           <Plus className="h-5 w-5" />
//         </button>
//       </div>

//       {/* Complaints list */}
//       <div className="space-y-2">
//         <SortableContext items={complaints.map(c => c.id)} strategy={verticalListSortingStrategy}>
//           {complaints.map((complaint) => (
//             <DraggableComplaintCard key={complaint.id} complaint={complaint} />
//           ))}
//         </SortableContext>

//         {complaints.length === 0 && (
//           <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
//             <div className="text-gray-400 mb-2">
//               {column.icon}
//             </div>
//             <p className="text-sm text-gray-500">No complaints here</p>
//             <button
//               onClick={() => onAddComplaint(column.id)}
//               className="mt-2 text-xs text-blue-600 hover:text-blue-800"
//             >
//               + Add complaint
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default function OfficerKanbanBoard() {
//   const [columns, setColumns] = useState<Column[]>([
//     {
//       id: 'pending',
//       title: 'Pending',
//       color: 'bg-yellow-100 text-yellow-600',
//       icon: <Clock className="h-5 w-5" />,
//       count: 0
//     },
//     {
//       id: 'in-progress',
//       title: 'In Progress',
//       color: 'bg-blue-100 text-blue-600',
//       icon: <AlertTriangle className="h-5 w-5" />,
//       count: 0
//     },
//     {
//       id: 'resolved',
//       title: 'Resolved',
//       color: 'bg-green-100 text-green-600',
//       icon: <CheckCircle className="h-5 w-5" />,
//       count: 0
//     },
//     {
//       id: 'rejected',
//       title: 'Rejected',
//       color: 'bg-red-100 text-red-600',
//       icon: <XCircle className="h-5 w-5" />,
//       count: 0
//     }
//   ]);

//   const [complaints, setComplaints] = useState<Record<ComplaintStatus, Complaint[]>>({
//     'pending': [],
//     'in-progress': [],
//     'resolved': [],
//     'rejected': []
//   });

//   const [search, setSearch] = useState('');
//   const [filter, setFilter] = useState('all');
//   const [activeComplaint, setActiveComplaint] = useState<Complaint | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [showFilters, setShowFilters] = useState(false);

//   // Load initial data
//   useEffect(() => {
//     // For demo, we'll load from localStorage
//     const loadComplaints = () => {
//       const storedComplaints = JSON.parse(localStorage.getItem('officerComplaints') || '[]');
      
//       // Group complaints by status
//       const grouped: Record<ComplaintStatus, Complaint[]> = {
//         'pending': [],
//         'in-progress': [],
//         'resolved': [],
//         'rejected': []
//       };

//       storedComplaints.forEach((complaint: Complaint) => {
//         if (grouped[complaint.status]) {
//           grouped[complaint.status].push(complaint);
//         }
//       });

//       setComplaints(grouped);
      
//       // Update column counts
//       setColumns(prev => prev.map(col => ({
//         ...col,
//         count: grouped[col.id].length
//       })));
      
//       setLoading(false);
//     };

//     loadComplaints();
    
//     // Refresh every 30 seconds for new complaints
//     const interval = setInterval(loadComplaints, 30000);
//     return () => clearInterval(interval);
//   }, []);

//   // Handle drag start
//   const handleDragStart = (event: DragStartEvent) => {
//     const { active } = event;
//     const draggedComplaint = Object.values(complaints)
//       .flat()
//       .find(c => c.id === active.id);
//     setActiveComplaint(draggedComplaint || null);
//   };

//   // Handle drag end
//   const handleDragEnd = (event: DragEndEvent) => {
//     const { active, over } = event;
    
//     if (!over) return;

//     const activeId = active.id as string;
//     const overId = over.id as string;

//     // If dropped over a column
//     if (['pending', 'in-progress', 'resolved', 'rejected'].includes(overId)) {
//       const newStatus = overId as ComplaintStatus;
      
//       // Find which column the complaint came from
//       let oldStatus: ComplaintStatus = 'pending';
//       Object.entries(complaints).forEach(([status, comps]) => {
//         if (comps.find(c => c.id === activeId)) {
//           oldStatus = status as ComplaintStatus;
//         }
//       });

//       if (oldStatus === newStatus) return;

//       // Update complaint status
//       const updatedComplaints = { ...complaints };
//       const complaintIndex = updatedComplaints[oldStatus].findIndex(c => c.id === activeId);
      
//       if (complaintIndex > -1) {
//         const [movedComplaint] = updatedComplaints[oldStatus].splice(complaintIndex, 1);
//         movedComplaint.status = newStatus;
//         movedComplaint.updatedAt = new Date().toISOString();
//         updatedComplaints[newStatus].push(movedComplaint);
        
//         setComplaints(updatedComplaints);
        
//         // Update column counts
//         setColumns(prev => prev.map(col => ({
//           ...col,
//           count: updatedComplaints[col.id].length
//         })));

//         // Update localStorage
//         const allComplaints = Object.values(updatedComplaints).flat();
//         localStorage.setItem('officerComplaints', JSON.stringify(allComplaints));

//         // Show success message
//         showNotification(`Moved to ${newStatus.replace('-', ' ')}`);
//       }
//     } 
//     // If dropped over another complaint (reordering within same column)
//     else {
//       // Find which column contains the active complaint
//       Object.keys(complaints).forEach(status => {
//         const statusKey = status as ComplaintStatus;
//         const columnComplaints = complaints[statusKey];
//         const oldIndex = columnComplaints.findIndex(c => c.id === activeId);
//         const newIndex = columnComplaints.findIndex(c => c.id === overId);

//         if (oldIndex !== -1 && newIndex !== -1 && oldIndex !== newIndex) {
//           const newComplaints = [...columnComplaints];
//           arrayMove(newComplaints, oldIndex, newIndex);
          
//           setComplaints(prev => ({
//             ...prev,
//             [statusKey]: newComplaints
//           }));

//           // Update localStorage
//           const allComplaints = Object.values({
//             ...complaints,
//             [statusKey]: newComplaints
//           }).flat();
//           localStorage.setItem('officerComplaints', JSON.stringify(allComplaints));
//         }
//       });
//     }

//     setActiveComplaint(null);
//   };

//   // Add new complaint
//   const handleAddComplaint = (status: ComplaintStatus) => {
//     const newComplaint: Complaint = {
//       id: `CMP-${Date.now()}`,
//       title: 'New Complaint',
//       description: 'Add description here...',
//       category: 'other',
//       status,
//       priority: 'medium',
//       createdAt: new Date().toISOString(),
//       updatedAt: new Date().toISOString(),
//       userName: 'New User',
//       userPhone: '0000000000',
//       images: [],
//       location: {
//         address: 'Location not set',
//         village: 'Unknown',
//         district: 'Unknown',
//         lat: 0,
//         lng: 0
//       }
//     };

//     const updatedComplaints = {
//       ...complaints,
//       [status]: [...complaints[status], newComplaint]
//     };

//     setComplaints(updatedComplaints);
    
//     setColumns(prev => prev.map(col => ({
//       ...col,
//       count: updatedComplaints[col.id].length
//     })));

//     // Update localStorage
//     const allComplaints = Object.values(updatedComplaints).flat();
//     localStorage.setItem('officerComplaints', JSON.stringify(allComplaints));

//     showNotification('New complaint added');
//   };

//   // Delete complaint
//   const handleDeleteComplaint = (id: string) => {
//     if (!confirm('Are you sure you want to delete this complaint?')) return;

//     Object.keys(complaints).forEach(status => {
//       const statusKey = status as ComplaintStatus;
//       const updatedList = complaints[statusKey].filter(c => c.id !== id);
      
//       if (updatedList.length !== complaints[statusKey].length) {
//         const updatedComplaints = {
//           ...complaints,
//           [statusKey]: updatedList
//         };
        
//         setComplaints(updatedComplaints);
        
//         setColumns(prev => prev.map(col => ({
//           ...col,
//           count: updatedComplaints[col.id].length
//         })));

//         // Update localStorage
//         const allComplaints = Object.values(updatedComplaints).flat();
//         localStorage.setItem('officerComplaints', JSON.stringify(allComplaints));

//         showNotification('Complaint deleted');
//       }
//     });
//   };

//   // Filter complaints based on search and filter
//   const getFilteredComplaints = (status: ComplaintStatus) => {
//     let filtered = complaints[status];

//     if (search) {
//       filtered = filtered.filter(c => 
//         c.title.toLowerCase().includes(search.toLowerCase()) ||
//         c.description.toLowerCase().includes(search.toLowerCase()) ||
//         c.userName.toLowerCase().includes(search.toLowerCase()) ||
//         c.location.village.toLowerCase().includes(search.toLowerCase())
//       );
//     }

//     if (filter !== 'all') {
//       filtered = filtered.filter(c => c.priority === filter);
//     }

//     return filtered;
//   };

//   // Show notification
//   const showNotification = (message: string) => {
//     // Create notification element
//     const notification = document.createElement('div');
//     notification.className = 'fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50';
//     notification.textContent = message;
//     document.body.appendChild(notification);

//     setTimeout(() => {
//       notification.remove();
//     }, 3000);
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading complaints board...</p>
//         </div>
//       </div>
//     );
//   }

//   const totalComplaints = Object.values(complaints).flat().length;

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-white shadow-sm border-b">
//         <div className="container mx-auto px-4 py-4">
//           <div className="flex flex-col md:flex-row md:items-center justify-between">
//             <div>
//               <h1 className="text-2xl font-bold text-gray-900">Complaints Board</h1>
//               <p className="text-gray-600">
//                 Drag and drop complaints to update their status
//               </p>
//             </div>
            
//             <div className="flex items-center space-x-4 mt-4 md:mt-0">
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//                 <input
//                   type="text"
//                   placeholder="Search complaints..."
//                   value={search}
//                   onChange={(e) => setSearch(e.target.value)}
//                   className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 w-full md:w-64"
//                 />
//               </div>
              
//               <div className="flex items-center space-x-2">
//                 <button
//                   onClick={() => setShowFilters(!showFilters)}
//                   className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
//                 >
//                   <Filter className="h-5 w-5 mr-2" />
//                   Filters
//                   <ChevronRight className={`h-4 w-4 ml-2 transition-transform ${showFilters ? 'rotate-90' : ''}`} />
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Filters Panel */}
//           {showFilters && (
//             <div className="mt-4 p-4 bg-gray-50 rounded-lg">
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
//                   <select
//                     value={filter}
//                     onChange={(e) => setFilter(e.target.value)}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg"
//                   >
//                     <option value="all">All Priorities</option>
//                     <option value="high">High</option>
//                     <option value="medium">Medium</option>
//                     <option value="low">Low</option>
//                   </select>
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
//                   <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
//                     <option value="all">All Categories</option>
//                     <option value="pothole">Pothole</option>
//                     <option value="sanitation">Sanitation</option>
//                     <option value="water">Water</option>
//                     <option value="electricity">Electricity</option>
//                   </select>
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
//                   <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
//                     <option value="today">Today</option>
//                     <option value="week">This Week</option>
//                     <option value="month">This Month</option>
//                     <option value="all">All Time</option>
//                   </select>
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Village</label>
//                   <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
//                     <option value="all">All Villages</option>
//                     <option value="village1">Village 1</option>
//                     <option value="village2">Village 2</option>
//                     <option value="village3">Village 3</option>
//                   </select>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Stats */}
//       <div className="container mx-auto px-4 py-6">
//         <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
//           <div className="bg-white rounded-lg shadow-sm p-4">
//             <p className="text-sm text-gray-500">Total Complaints</p>
//             <p className="text-2xl font-bold mt-1">{totalComplaints}</p>
//           </div>
          
//           {columns.map((column) => (
//             <div key={column.id} className="bg-white rounded-lg shadow-sm p-4">
//               <div className="flex items-center">
//                 <div className={`p-2 rounded-lg ${column.color} mr-3`}>
//                   {column.icon}
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-500">{column.title}</p>
//                   <p className="text-2xl font-bold mt-1">{column.count}</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Kanban Board */}
//       <DndContext
//         onDragStart={handleDragStart}
//         onDragEnd={handleDragEnd}
//         collisionDetection={closestCorners}
//       >
//         <div className="container mx-auto px-4 pb-8">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {columns.map((column) => (
//               <div key={column.id} className="flex flex-col">
//                 <Column
//                   column={column}
//                   complaints={getFilteredComplaints(column.id)}
//                   onAddComplaint={handleAddComplaint}
//                   onDeleteComplaint={handleDeleteComplaint}
//                 />
//               </div>
//             ))}
//           </div>

//           {/* Empty state */}
//           {totalComplaints === 0 && (
//             <div className="text-center py-12">
//               <div className="max-w-md mx-auto">
//                 <div className="text-gray-400 mb-4">
//                   <AlertTriangle className="h-16 w-16 mx-auto" />
//                 </div>
//                 <h3 className="text-lg font-medium text-gray-900 mb-2">No complaints yet</h3>
//                 <p className="text-gray-600 mb-6">
//                   Complaints reported by citizens will appear here. You can drag and drop them between columns.
//                 </p>
//                 <button
//                   onClick={() => handleAddComplaint('pending')}
//                   className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center mx-auto"
//                 >
//                   <Plus className="h-5 w-5 mr-2" />
//                   Add Sample Complaint
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Drag Overlay */}
//         <DragOverlay>
//           {activeComplaint && (
//             <div className="bg-white rounded-lg shadow-xl border-2 border-blue-500 opacity-80">
//               <div className="p-4">
//                 <div className="flex items-center space-x-2 mb-2">
//                   <GripVertical className="h-5 w-5 text-blue-500" />
//                   <h4 className="font-semibold text-gray-900">{activeComplaint.title}</h4>
//                 </div>
//                 <p className="text-sm text-gray-600 mb-2">Dragging to new status...</p>
//               </div>
//             </div>
//           )}
//         </DragOverlay>
//       </DndContext>

//       {/* Instructions */}
//       <div className="container mx-auto px-4 pb-8">
//         <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
//           <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
//             <AlertTriangle className="h-5 w-5 mr-2 text-blue-600" />
//             How to use the Kanban Board
//           </h3>
//           <div className="grid md:grid-cols-3 gap-4">
//             <div className="flex items-start space-x-3">
//               <div className="bg-blue-100 text-blue-600 rounded-full p-2">
//                 <GripVertical className="h-4 w-4" />
//               </div>
//               <div>
//                 <p className="font-medium text-sm">Drag & Drop</p>
//                 <p className="text-sm text-gray-600">Drag complaints between columns to update status</p>
//               </div>
//             </div>
            
//             <div className="flex items-start space-x-3">
//               <div className="bg-green-100 text-green-600 rounded-full p-2">
//                 <MessageSquare className="h-4 w-4" />
//               </div>
//               <div>
//                 <p className="font-medium text-sm">Message Citizen</p>
//                 <p className="text-sm text-gray-600">Click message icon to update complainant</p>
//               </div>
//             </div>
            
//             <div className="flex items-start space-x-3">
//               <div className="bg-purple-100 text-purple-600 rounded-full p-2">
//                 <Users className="h-4 w-4" />
//               </div>
//               <div>
//                 <p className="font-medium text-sm">Assign</p>
//                 <p className="text-sm text-gray-600">Assign complaints to other officers</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
// src/app/officer/complaints/board/page.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import {
  Plus,
  Filter,
  Search,
  MoreVertical,
  Users,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
  XCircle,
  GripVertical,
  Trash2,
  MapPin,
  Camera,
  MessageSquare,
  ChevronRight,
  Eye,
  Edit,
  Download
} from 'lucide-react';
import { 
  DndContext, 
  DragEndEvent, 
  DragOverlay, 
  DragStartEvent, 
  PointerSensor,
  useSensor,
  useSensors,
  DragOverEvent,
  rectIntersection,
  pointerWithin,
  UniqueIdentifier
} from '@dnd-kit/core';
import { 
  SortableContext, 
  verticalListSortingStrategy,
  arrayMove
} from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

type ComplaintStatus = 'pending' | 'in-progress' | 'resolved' | 'rejected';

interface Complaint {
  id: string;
  title: string;
  description: string;
  category: string;
  status: ComplaintStatus;
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  updatedAt: string;
  assignedTo?: string;
  userName: string;
  userPhone: string;
  images: string[];
  location: {
    address: string;
    village: string;
    district: string;
    lat: number;
    lng: number;
  };
}

interface Column {
  id: ComplaintStatus;
  title: string;
  color: string;
  icon: React.ReactNode;
  count: number;
}

// Droppable Column Container Component
function DroppableColumn({
  id,
  children,
  className
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isOver
  } = useSortable({
    id,
    data: {
      type: 'column',
      accepts: ['complaint']
    }
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative ${className} ${isOver ? 'ring-2 ring-blue-500 ring-inset' : ''}`}
      {...attributes}
      {...listeners}
    >
      {children}
    </div>
  );
}

// Menu Component for each complaint card
function ComplaintMenu({ 
  complaint, 
  onPreview, 
  onDelete 
}: { 
  complaint: Complaint; 
  onPreview: () => void; 
  onDelete: () => void; 
}) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const menuItems = [
    {
      label: 'Preview',
      icon: <Eye className="h-4 w-4" />,
      onClick: () => {
        onPreview();
        setIsOpen(false);
      },
      color: 'text-blue-600'
    },
    {
      label: 'Edit',
      icon: <Edit className="h-4 w-4" />,
      onClick: () => {
        alert(`Edit complaint: ${complaint.title}`);
        setIsOpen(false);
      },
      color: 'text-green-600'
    },
    {
      label: 'Download Details',
      icon: <Download className="h-4 w-4" />,
      onClick: () => {
        const data = JSON.stringify(complaint, null, 2);
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `complaint-${complaint.id}.json`;
        a.click();
        setIsOpen(false);
      },
      color: 'text-purple-600'
    },
    {
      label: 'Delete',
      icon: <Trash2 className="h-4 w-4" />,
      onClick: () => {
        onDelete();
        setIsOpen(false);
      },
      color: 'text-red-600'
    }
  ];

  return (
    <div className="relative" ref={menuRef}>
      <button 
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="text-gray-400 hover:text-gray-600 p-1 rounded hover:bg-gray-100"
      >
        <MoreVertical className="h-5 w-5" />
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50">
          <div className="py-1">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  item.onClick();
                }}
                className={`flex items-center w-full px-4 py-2 text-sm ${item.color} hover:bg-gray-100`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Draggable Complaint Card Component
function DraggableComplaintCard({ 
  complaint, 
  onDelete 
}: { 
  complaint: Complaint; 
  onDelete: (id: string) => void; 
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ 
    id: complaint.id,
    data: {
      type: 'complaint',
      complaint,
      status: complaint.status
    }
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, string> = {
      'pothole': '🛣️',
      'sanitation': '🗑️',
      'water': '💧',
      'electricity': '⚡',
      'drainage': '🚰',
      'street-light': '💡',
      'other': '❓'
    };
    return icons[category] || '📌';
  };

  const handlePreview = () => {
    // In a real app, you would show a modal with complaint details
    alert(`Previewing: ${complaint.title}\n\nDescription: ${complaint.description}\n\nImages: ${complaint.images.length} images attached`);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-white rounded-lg shadow-sm border border-gray-200 mb-3 hover:shadow-md transition-shadow cursor-move"
      onClick={(e) => {
        // Only open preview if not clicking on drag handle or menu
        if (!(e.target as HTMLElement).closest('.drag-handle') && 
            !(e.target as HTMLElement).closest('.complaint-menu')) {
          handlePreview();
        }
      }}
    >
      <div className="p-4">
        {/* Drag handle and header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-2 drag-handle">
            <button
              {...attributes}
              {...listeners}
              className="text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing"
            >
              <GripVertical className="h-5 w-5" />
            </button>
            <span className="text-xl">{getCategoryIcon(complaint.category)}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(complaint.priority)}`}>
              {complaint.priority}
            </span>
            <div className="complaint-menu">
              <ComplaintMenu 
                complaint={complaint}
                onPreview={handlePreview}
                onDelete={() => onDelete(complaint.id)}
              />
            </div>
          </div>
        </div>

        {/* Complaint content */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">
            {complaint.title}
          </h4>
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {complaint.description}
          </p>
        </div>

        {/* Metadata */}
        <div className="space-y-2">
          <div className="flex items-center text-xs text-gray-500">
            <Users className="h-3 w-3 mr-1" />
            <span className="truncate">{complaint.userName}</span>
          </div>
          
          <div className="flex items-center text-xs text-gray-500">
            <MapPin className="h-3 w-3 mr-1" />
            <span className="truncate">{complaint.location.village}</span>
          </div>

          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center">
              <Calendar className="h-3 w-3 mr-1" />
              {new Date(complaint.createdAt).toLocaleDateString()}
            </div>
            {complaint.images.length > 0 && (
              <div className="flex items-center">
                <Camera className="h-3 w-3 mr-1" />
                {complaint.images.length}
              </div>
            )}
          </div>
        </div>

        {/* Action buttons */}
        <div className="mt-4 pt-3 border-t border-gray-100">
          <div className="flex justify-between items-center">
            <button className="text-xs text-blue-600 hover:text-blue-800 flex items-center">
              <MessageSquare className="h-3 w-3 mr-1" />
              Message
            </button>
            <button className="text-xs px-3 py-1 bg-blue-50 text-blue-600 rounded hover:bg-blue-100">
              Assign
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Column Component
function Column({
  column,
  complaints,
  onAddComplaint,
  onDeleteComplaint
}: {
  column: Column;
  complaints: Complaint[];
  onAddComplaint: (status: ComplaintStatus) => void;
  onDeleteComplaint: (id: string) => void;
}) {
  return (
    <DroppableColumn id={column.id} className="bg-gray-50 rounded-xl p-4 h-full">
      {/* Column header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className={`p-2 rounded-lg ${column.color}`}>
            {column.icon}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{column.title}</h3>
            <p className="text-sm text-gray-500">{column.count} complaints</p>
          </div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddComplaint(column.id);
          }}
          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded"
        >
          <Plus className="h-5 w-5" />
        </button>
      </div>

      {/* Complaints list */}
      <div className="space-y-2 min-h-[200px]">
        <SortableContext 
          items={complaints.map(c => c.id)} 
          strategy={verticalListSortingStrategy}
        >
          {complaints.map((complaint) => (
            <DraggableComplaintCard 
              key={complaint.id} 
              complaint={complaint}
              onDelete={onDeleteComplaint}
            />
          ))}
        </SortableContext>

        {complaints.length === 0 && (
          <div 
            className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg"
            onClick={(e) => {
              e.stopPropagation();
              onAddComplaint(column.id);
            }}
          >
            <div className="text-gray-400 mb-2">
              {column.icon}
            </div>
            <p className="text-sm text-gray-500">No complaints here</p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAddComplaint(column.id);
              }}
              className="mt-2 text-xs text-blue-600 hover:text-blue-800"
            >
              + Add complaint
            </button>
          </div>
        )}
      </div>
    </DroppableColumn>
  );
}

export default function OfficerKanbanBoard() {
  const [columns, setColumns] = useState<Column[]>([
    {
      id: 'pending',
      title: 'Pending',
      color: 'bg-yellow-100 text-yellow-600',
      icon: <Clock className="h-5 w-5" />,
      count: 0
    },
    {
      id: 'in-progress',
      title: 'In Progress',
      color: 'bg-blue-100 text-blue-600',
      icon: <AlertTriangle className="h-5 w-5" />,
      count: 0
    },
    {
      id: 'resolved',
      title: 'Resolved',
      color: 'bg-green-100 text-green-600',
      icon: <CheckCircle className="h-5 w-5" />,
      count: 0
    },
    {
      id: 'rejected',
      title: 'Rejected',
      color: 'bg-red-100 text-red-600',
      icon: <XCircle className="h-5 w-5" />,
      count: 0
    }
  ]);

  const [complaints, setComplaints] = useState<Record<ComplaintStatus, Complaint[]>>({
    'pending': [],
    'in-progress': [],
    'resolved': [],
    'rejected': []
  });

  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [activeComplaint, setActiveComplaint] = useState<Complaint | null>(null);
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);

  // Configure sensors for better drag and drop
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  // Initialize with sample data
  useEffect(() => {
    const initializeSampleData = () => {
      const sampleComplaints: Complaint[] = [
        {
          id: 'CMP-1001',
          title: 'Pothole on Main Road',
          description: 'Large pothole near the market causing traffic issues',
          category: 'pothole',
          status: 'pending',
          priority: 'high',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          userName: 'Rahul Sharma',
          userPhone: '9876543210',
          images: ['image1.jpg', 'image2.jpg'],
          location: {
            address: 'Main Road, Near Market',
            village: 'Sample Village',
            district: 'North District',
            lat: 28.6139,
            lng: 77.2090
          }
        },
        {
          id: 'CMP-1002',
          title: 'Garbage Not Collected',
          description: 'Garbage pile not collected for 3 days',
          category: 'sanitation',
          status: 'in-progress',
          priority: 'medium',
          createdAt: new Date(Date.now() - 86400000).toISOString(),
          updatedAt: new Date().toISOString(),
          userName: 'Priya Patel',
          userPhone: '8765432109',
          images: ['image3.jpg'],
          location: {
            address: 'Street No. 5',
            village: 'Another Village',
            district: 'South District',
            lat: 28.6140,
            lng: 77.2091
          }
        },
        {
          id: 'CMP-1003',
          title: 'Street Light Not Working',
          description: 'Street light pole number 23 is not working',
          category: 'street-light',
          status: 'resolved',
          priority: 'low',
          createdAt: new Date(Date.now() - 172800000).toISOString(),
          updatedAt: new Date().toISOString(),
          userName: 'Amit Kumar',
          userPhone: '7654321098',
          images: [],
          location: {
            address: 'Near Park',
            village: 'Green Village',
            district: 'East District',
            lat: 28.6141,
            lng: 77.2092
          }
        }
      ];

      // Group complaints by status
      const grouped: Record<ComplaintStatus, Complaint[]> = {
        'pending': [],
        'in-progress': [],
        'resolved': [],
        'rejected': []
      };

      sampleComplaints.forEach((complaint: Complaint) => {
        if (grouped[complaint.status]) {
          grouped[complaint.status].push(complaint);
        }
      });

      setComplaints(grouped);
      
      // Update column counts
      setColumns(prev => prev.map(col => ({
        ...col,
        count: grouped[col.id].length
      })));
      
      setLoading(false);
    };

    initializeSampleData();
  }, []);

  // Handle drag start
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const draggedComplaint = Object.values(complaints)
      .flat()
      .find(c => c.id === active.id);
    setActiveComplaint(draggedComplaint || null);

    // Also set active column if dragging a column
    const column = columns.find(col => col.id === active.id);
    setActiveColumn(column || null);
  };

  // Handle drag over
  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    // If dragging a complaint over a column
    if (['pending', 'in-progress', 'resolved', 'rejected'].includes(overId)) {
      const newStatus = overId as ComplaintStatus;
      
      // Find the active complaint's current status
      let oldStatus: ComplaintStatus = 'pending';
      Object.entries(complaints).forEach(([status, comps]) => {
        if (comps.find(c => c.id === activeId)) {
          oldStatus = status as ComplaintStatus;
        }
      });

      if (oldStatus === newStatus) return;

      // Don't update state here, just visual feedback
      // The actual move happens in handleDragEnd
    }
  };

  // Handle drag end
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over) {
      setActiveComplaint(null);
      setActiveColumn(null);
      return;
    }

    const activeId = active.id as string;
    const overId = over.id as string;

    console.log('Drag end:', { activeId, overId });

    // If dropped over a column (changing status)
    if (['pending', 'in-progress', 'resolved', 'rejected'].includes(overId)) {
      const newStatus = overId as ComplaintStatus;
      
      // Find which column the complaint came from
      let oldStatus: ComplaintStatus = 'pending';
      let complaintToMove: Complaint | null = null;
      
      Object.entries(complaints).forEach(([status, comps]) => {
        const comp = comps.find(c => c.id === activeId);
        if (comp) {
          oldStatus = status as ComplaintStatus;
          complaintToMove = comp;
        }
      });

      if (!complaintToMove || oldStatus === newStatus) {
        setActiveComplaint(null);
        setActiveColumn(null);
        return;
      }

      // Create updated complaints object
      const updatedComplaints = { ...complaints };
      
      // Remove from old status
      updatedComplaints[oldStatus] = updatedComplaints[oldStatus].filter(c => c.id !== activeId);
      
      // Add to new status with updated complaint
      const updatedComplaint = {
        ...complaintToMove,
        status: newStatus,
        updatedAt: new Date().toISOString()
      };
      
      updatedComplaints[newStatus] = [...updatedComplaints[newStatus], updatedComplaint];
      
      console.log('Moving complaint:', { oldStatus, newStatus, updatedComplaints });
      
      // Update state
      setComplaints(updatedComplaints);
      
      // Update column counts
      setColumns(prev => prev.map(col => ({
        ...col,
        count: updatedComplaints[col.id].length
      })));

      // Save to localStorage
      const allComplaints = Object.values(updatedComplaints).flat();
      localStorage.setItem('officerComplaints', JSON.stringify(allComplaints));

      showNotification(`Status updated to ${newStatus.replace('-', ' ')}`);
    } 
    // If dropped over another complaint (reordering within same column)
    else {
      // Find which column contains the active complaint
      Object.keys(complaints).forEach(status => {
        const statusKey = status as ComplaintStatus;
        const columnComplaints = complaints[statusKey];
        const oldIndex = columnComplaints.findIndex(c => c.id === activeId);
        const newIndex = columnComplaints.findIndex(c => c.id === overId);

        if (oldIndex !== -1 && newIndex !== -1 && oldIndex !== newIndex) {
          const newComplaints = [...columnComplaints];
          arrayMove(newComplaints, oldIndex, newIndex);
          
          setComplaints(prev => ({
            ...prev,
            [statusKey]: newComplaints
          }));

          // Update localStorage
          const allComplaints = Object.values({
            ...complaints,
            [statusKey]: newComplaints
          }).flat();
          localStorage.setItem('officerComplaints', JSON.stringify(allComplaints));
        }
      });
    }

    setActiveComplaint(null);
    setActiveColumn(null);
  };

  // Add new complaint
  const handleAddComplaint = (status: ComplaintStatus) => {
    const newComplaint: Complaint = {
      id: `CMP-${Date.now()}`,
      title: 'New Complaint',
      description: 'Add description here...',
      category: 'other',
      status,
      priority: 'medium',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      userName: 'New User',
      userPhone: '0000000000',
      images: [],
      location: {
        address: 'Location not set',
        village: 'Unknown',
        district: 'Unknown',
        lat: 0,
        lng: 0
      }
    };

    const updatedComplaints = {
      ...complaints,
      [status]: [...complaints[status], newComplaint]
    };

    setComplaints(updatedComplaints);
    
    setColumns(prev => prev.map(col => ({
      ...col,
      count: updatedComplaints[col.id].length
    })));

    // Update localStorage
    const allComplaints = Object.values(updatedComplaints).flat();
    localStorage.setItem('officerComplaints', JSON.stringify(allComplaints));

    showNotification('New complaint added');
  };

  // Delete complaint
  const handleDeleteComplaint = (id: string) => {
    if (!confirm('Are you sure you want to delete this complaint?')) return;

    Object.keys(complaints).forEach(status => {
      const statusKey = status as ComplaintStatus;
      const updatedList = complaints[statusKey].filter(c => c.id !== id);
      
      if (updatedList.length !== complaints[statusKey].length) {
        const updatedComplaints = {
          ...complaints,
          [statusKey]: updatedList
        };
        
        setComplaints(updatedComplaints);
        
        setColumns(prev => prev.map(col => ({
          ...col,
          count: updatedComplaints[col.id].length
        })));

        // Update localStorage
        const allComplaints = Object.values(updatedComplaints).flat();
        localStorage.setItem('officerComplaints', JSON.stringify(allComplaints));

        showNotification('Complaint deleted');
      }
    });
  };

  // Filter complaints based on search and filter
  const getFilteredComplaints = (status: ComplaintStatus) => {
    let filtered = complaints[status];

    if (search) {
      filtered = filtered.filter(c => 
        c.title.toLowerCase().includes(search.toLowerCase()) ||
        c.description.toLowerCase().includes(search.toLowerCase()) ||
        c.userName.toLowerCase().includes(search.toLowerCase()) ||
        c.location.village.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (filter !== 'all') {
      filtered = filtered.filter(c => c.priority === filter);
    }

    return filtered;
  };

  // Show notification
  const showNotification = (message: string) => {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.remove();
    }, 3000);
  };

  // Preview Modal
  const PreviewModal = () => {
    if (!selectedComplaint) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{selectedComplaint.title}</h2>
                <p className="text-gray-600">{selectedComplaint.description}</p>
              </div>
              <button
                onClick={() => setShowPreviewModal(false)}
                className="text-gray-400 hover:text-gray-600 p-2"
              >
                ✕
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Details</h3>
                  <div className="space-y-2">
                    <div className="flex">
                      <span className="text-gray-600 w-32">Category:</span>
                      <span className="font-medium">{selectedComplaint.category}</span>
                    </div>
                    <div className="flex">
                      <span className="text-gray-600 w-32">Priority:</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        selectedComplaint.priority === 'high' ? 'bg-red-100 text-red-800' :
                        selectedComplaint.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {selectedComplaint.priority}
                      </span>
                    </div>
                    <div className="flex">
                      <span className="text-gray-600 w-32">Status:</span>
                      <span className="font-medium">{selectedComplaint.status}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Complainant Info</h3>
                  <div className="space-y-2">
                    <div className="flex">
                      <span className="text-gray-600 w-32">Name:</span>
                      <span className="font-medium">{selectedComplaint.userName}</span>
                    </div>
                    <div className="flex">
                      <span className="text-gray-600 w-32">Phone:</span>
                      <span className="font-medium">{selectedComplaint.userPhone}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Location</h3>
                  <div className="space-y-2">
                    <div className="flex">
                      <span className="text-gray-600 w-32">Address:</span>
                      <span className="font-medium">{selectedComplaint.location.address}</span>
                    </div>
                    <div className="flex">
                      <span className="text-gray-600 w-32">Village:</span>
                      <span className="font-medium">{selectedComplaint.location.village}</span>
                    </div>
                    <div className="flex">
                      <span className="text-gray-600 w-32">District:</span>
                      <span className="font-medium">{selectedComplaint.location.district}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Timestamps</h3>
                  <div className="space-y-2">
                    <div className="flex">
                      <span className="text-gray-600 w-32">Created:</span>
                      <span className="font-medium">
                        {new Date(selectedComplaint.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex">
                      <span className="text-gray-600 w-32">Updated:</span>
                      <span className="font-medium">
                        {new Date(selectedComplaint.updatedAt).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {selectedComplaint.images.length > 0 && (
              <div className="mt-6">
                <h3 className="font-semibold text-gray-900 mb-4">Images</h3>
                <div className="grid grid-cols-3 gap-4">
                  {selectedComplaint.images.map((img, index) => (
                    <div key={index} className="bg-gray-100 rounded-lg p-4 text-center">
                      <Camera className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600 truncate">{img}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end space-x-4">
              <button
                onClick={() => setShowPreviewModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Close
              </button>
              <button
                onClick={() => {
                  alert('Message feature would open here');
                  setShowPreviewModal(false);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Message Complainant
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading complaints board...</p>
        </div>
      </div>
    );
  }

  const totalComplaints = Object.values(complaints).flat().length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Complaints Board</h1>
              <p className="text-gray-600">
                Drag and drop complaints to update their status
              </p>
            </div>
            
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search complaints..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 w-full md:w-64"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <Filter className="h-5 w-5 mr-2" />
                  Filters
                  <ChevronRight className={`h-4 w-4 ml-2 transition-transform ${showFilters ? 'rotate-90' : ''}`} />
                </button>
              </div>
            </div>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                  <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="all">All Priorities</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                    <option value="all">All Categories</option>
                    <option value="pothole">Pothole</option>
                    <option value="sanitation">Sanitation</option>
                    <option value="water">Water</option>
                    <option value="electricity">Electricity</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                    <option value="today">Today</option>
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                    <option value="all">All Time</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Village</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                    <option value="all">All Villages</option>
                    <option value="village1">Village 1</option>
                    <option value="village2">Village 2</option>
                    <option value="village3">Village 3</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <p className="text-sm text-gray-500">Total Complaints</p>
            <p className="text-2xl font-bold mt-1">{totalComplaints}</p>
          </div>
          
          {columns.map((column) => (
            <div key={column.id} className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex items-center">
                <div className={`p-2 rounded-lg ${column.color} mr-3`}>
                  {column.icon}
                </div>
                <div>
                  <p className="text-sm text-gray-500">{column.title}</p>
                  <p className="text-2xl font-bold mt-1">{column.count}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Kanban Board */}
      <DndContext
        sensors={sensors}
        collisionDetection={rectIntersection}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="container mx-auto px-4 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {columns.map((column) => (
              <div key={column.id} className="flex flex-col">
                <Column
                  column={column}
                  complaints={getFilteredComplaints(column.id)}
                  onAddComplaint={handleAddComplaint}
                  onDeleteComplaint={handleDeleteComplaint}
                />
              </div>
            ))}
          </div>

          {/* Empty state */}
          {totalComplaints === 0 && (
            <div className="text-center py-12">
              <div className="max-w-md mx-auto">
                <div className="text-gray-400 mb-4">
                  <AlertTriangle className="h-16 w-16 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No complaints yet</h3>
                <p className="text-gray-600 mb-6">
                  Complaints reported by citizens will appear here. You can drag and drop them between columns.
                </p>
                <button
                  onClick={() => handleAddComplaint('pending')}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center mx-auto"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Add Sample Complaint
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Drag Overlay */}
        <DragOverlay>
          {activeComplaint && (
            <div className="bg-white rounded-lg shadow-xl border-2 border-blue-500 opacity-80 max-w-xs">
              <div className="p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <GripVertical className="h-5 w-5 text-blue-500" />
                  <h4 className="font-semibold text-gray-900">{activeComplaint.title}</h4>
                </div>
                <p className="text-sm text-gray-600">Moving to new status...</p>
              </div>
            </div>
          )}
        </DragOverlay>
      </DndContext>

      {/* Instructions */}
      <div className="container mx-auto px-4 pb-8">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2 text-blue-600" />
            How to use the Kanban Board
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="flex items-start space-x-3">
              <div className="bg-blue-100 text-blue-600 rounded-full p-2">
                <GripVertical className="h-4 w-4" />
              </div>
              <div>
                <p className="font-medium text-sm">Drag & Drop</p>
                <p className="text-sm text-gray-600">Grab the handle and drag between columns</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="bg-green-100 text-green-600 rounded-full p-2">
                <MessageSquare className="h-4 w-4" />
              </div>
              <div>
                <p className="font-medium text-sm">Message Citizen</p>
                <p className="text-sm text-gray-600">Click message icon to update complainant</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="bg-purple-100 text-purple-600 rounded-full p-2">
                <MoreVertical className="h-4 w-4" />
              </div>
              <div>
                <p className="font-medium text-sm">More Options</p>
                <p className="text-sm text-gray-600">Click three dots for preview, edit, delete</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {showPreviewModal && <PreviewModal />}
    </div>
  );
}