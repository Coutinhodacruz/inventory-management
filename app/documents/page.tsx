'use client'

import { useState } from 'react'
import {
  FileCheck,
  FileText,
  Folder,
  FolderPlus,
  MoreHorizontal,
  Plus,
  Upload,
  X,
  Search,
} from 'lucide-react'
import { DashboardShell } from '@/components/dashboard'

export default function DocumentsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isUploadOpen, setIsUploadOpen] = useState(false)
  const [uploadName, setUploadName] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Certificates')

  const [folders, setFolders] = useState([
    { name: 'Customs & Import Declarations (Nairobi & Lagos)', count: '14 files', size: '28.4 MB', tag: 'Customs' },
    { name: 'Certificates of Italian Authenticity (Calfskin & Patina)', count: '22 files', size: '45.1 MB', tag: 'Certificates' },
    { name: 'Air Freight Consignment Slips (DHL & FedEx Express)', count: '38 files', size: '12.8 MB', tag: 'Logistics' },
    { name: 'VIP Private Commission Contracts (Bespoke Footwear)', count: '9 files', size: '19.2 MB', tag: 'VIP Contracts' },
    { name: 'Boutique POS Daily Settlement Logs & Audits', count: '64 files', size: '8.6 MB', tag: 'Financial' },
    { name: 'Master Horology & Leathercraft Warranty Deeds', count: '17 files', size: '15.3 MB', tag: 'Certificates' },
  ])

  const filteredFolders = folders.filter((f) =>
    f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.tag.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!uploadName) return
    setFolders([
      {
        name: uploadName,
        count: '1 file',
        size: '1.2 MB',
        tag: selectedCategory,
      },
      ...folders,
    ])
    setUploadName('')
    setIsUploadOpen(false)
  }

  return (
    <DashboardShell searchQuery={searchQuery} onSearchChange={setSearchQuery}>
      <div className="space-y-6 p-4 sm:p-6 lg:p-8">
        {/* Page Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0F1E36]">
                Documents & Archival Vault
              </h1>
              <span className="rounded-full bg-[#0F1E36]/10 px-2.5 py-0.5 text-xs font-semibold text-[#0F1E36]">
                {folders.length} Dossiers
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-500">
              Encrypted luxury documents, provenance certificates, customs clearances, and bespoke VIP client contracts.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => setIsUploadOpen(true)}
              className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-xs hover:bg-slate-50 active:scale-[0.98]"
            >
              <FolderPlus className="size-3.5 text-[#0F1E36]" />
              <span>New Dossier</span>
            </button>
            <button
              type="button"
              onClick={() => setIsUploadOpen(true)}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#0F1E36] to-[#8A1538] px-4 py-2 text-xs font-semibold text-white shadow-sm hover:opacity-95 active:scale-[0.98]"
            >
              <Upload className="size-3.5" />
              <span>Upload Document</span>
            </button>
          </div>
        </div>

        {/* Folders Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredFolders.map((f, i) => (
            <div
              key={i}
              className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-xs transition-all hover:border-[#8A1538]/40 hover:shadow-md"
            >
              <div className="flex items-start gap-4">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#C5A059]/15 text-[#C5A059] group-hover:scale-105 transition-transform">
                  <Folder className="size-6 fill-[#C5A059]/30" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="inline-block rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600 mb-1.5">
                    {f.tag}
                  </span>
                  <h3 className="line-clamp-2 text-xs font-bold text-[#0F1E36] group-hover:text-[#8A1538] transition-colors leading-relaxed">
                    {f.name}
                  </h3>
                  <p className="mt-1.5 text-[11px] text-slate-500 font-medium">
                    {f.count} • {f.size}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-[11px] font-semibold">
                <button
                  type="button"
                  className="text-[#0F1E36] hover:text-[#8A1538] hover:underline"
                >
                  Consult Dossier
                </button>
                <button
                  type="button"
                  className="text-slate-500 hover:text-slate-800"
                >
                  Download Archive (.zip)
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Upload Modal */}
        {isUploadOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
            <div className="w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-base font-bold text-[#0F1E36]">Deposit Dossier Document</h3>
                  <p className="text-xs text-slate-500">
                    Secure upload into Maison archival vault.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsUploadOpen(false)}
                  className="rounded-lg p-1 text-slate-400 hover:bg-slate-100"
                >
                  <X className="size-5" />
                </button>
              </div>

              <form onSubmit={handleUploadSubmit} className="mt-4 space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700">Dossier / File Title</label>
                  <input
                    required
                    value={uploadName}
                    onChange={(e) => setUploadName(e.target.value)}
                    placeholder="e.g. Master Goldsmith Assay Certification 2026"
                    className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-xs outline-none focus:border-[#0F1E36]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700">Archival Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs outline-none focus:border-[#0F1E36]"
                  >
                    <option value="Certificates">Certificates & Provenance</option>
                    <option value="Customs">Customs & Tariffs</option>
                    <option value="Logistics">Freight & Air Transport</option>
                    <option value="VIP Contracts">VIP Bespoke Commissions</option>
                    <option value="Financial">Daily Settlement & Audits</option>
                  </select>
                </div>

                <div className="rounded-xl border-2 border-dashed border-slate-200 p-6 text-center">
                  <Upload className="mx-auto size-8 text-[#C5A059]" />
                  <p className="mt-2 text-xs font-semibold text-slate-700">Drag & drop files here, or browse</p>
                  <p className="mt-1 text-[11px] text-slate-400">PDF, TIFF, JPEG up to 50MB</p>
                </div>

                <div className="flex justify-end gap-2.5 border-t border-slate-100 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsUploadOpen(false)}
                    className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-[#0F1E36] px-4 py-2 text-xs font-semibold text-white hover:bg-[#1E3A5F]"
                  >
                    Save to Vault
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardShell>
  )
}
