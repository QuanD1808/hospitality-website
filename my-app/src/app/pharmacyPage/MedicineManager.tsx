import React, { useState, useEffect } from 'react';
import { PlusCircle, Trash2, Edit, Save, XCircle, Search, AlertTriangle, RefreshCw, FileText } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import * as apiService from '../services/api.service';
import { Medicine } from './medicine.model';

interface MedicineManagerProps {
  onClose: () => void;
}

export const MedicineManager = ({ onClose }: MedicineManagerProps) => {
  const { token } = useAuth();
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [editingMedicine, setEditingMedicine] = useState<Medicine | null>(null);
  const [newMedicine, setNewMedicine] = useState<Partial<Medicine>>({
    customMedicineId: '',
    name: '',
    totalPills: 0,
    price: 0
  });
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterEnabled, setFilterEnabled] = useState<boolean>(false);

  const fetchMedicines = async () => {
    if (!token) return;
    
    setLoading(true);
    try {
      const data = await apiService.getMedicines(token);
      setMedicines(data);
      setError(null);
    } catch (err: any) {
      console.error("Error fetching medicines:", err);
      setError("Không thể tải danh sách thuốc. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedicines();
  }, [token]);

  const handleAddMedicine = async () => {
    if (!token) return;
    
    // Validate form data
    if (!newMedicine.customMedicineId || !newMedicine.name || newMedicine.totalPills === undefined || newMedicine.price === undefined) {
      setError("Vui lòng điền đầy đủ thông tin thuốc.");
      return;
    }
    
    setLoading(true);
    try {
      await apiService.createMedicine(newMedicine, token);
      // Reset form
      setNewMedicine({
        customMedicineId: '',
        name: '',
        totalPills: 0,
        price: 0
      });
      setShowAddForm(false);
      fetchMedicines();
      setError(null);
    } catch (err: any) {
      console.error("Error adding medicine:", err);
      setError(err.response?.data?.message || "Không thể thêm thuốc. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const handleEditMedicine = (medicine: Medicine) => {
    setEditingMedicine(medicine);
  };

  const handleSaveEdit = async () => {
    if (!token || !editingMedicine?._id) return;
    
    setLoading(true);
    try {
      await apiService.updateMedicine(editingMedicine._id, editingMedicine, token);
      setEditingMedicine(null);
      fetchMedicines();
      setError(null);
    } catch (err: any) {
      console.error("Error updating medicine:", err);
      setError(err.response?.data?.message || "Không thể cập nhật thuốc. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMedicine = async (medicineId: string) => {
    if (!token) return;
    
    if (!window.confirm("Bạn có chắc chắn muốn xóa thuốc này không?")) {
      return;
    }
    
    setLoading(true);
    try {
      await apiService.deleteMedicine(medicineId, token);
      fetchMedicines();
      setError(null);
    } catch (err: any) {
      console.error("Error deleting medicine:", err);
      setError(err.response?.data?.message || "Không thể xóa thuốc. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const filteredMedicines = filterEnabled && searchTerm
    ? medicines.filter(med => 
        med.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        med.customMedicineId.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : medicines;

  return (      <div className="bg-white border border-gray-300 rounded-lg shadow-lg">
      {/* Header */}
      <div className="bg-blue-800 px-6 py-4 flex justify-between items-center rounded-t-lg">
        <h2 className="text-lg font-semibold text-white flex items-center">
          <FileText size={20} className="mr-2 text-white" />
          Quản Lý Thuốc
        </h2>
        <button 
          onClick={onClose}
          className="text-white hover:text-gray-200 transition-colors"
        >
          <XCircle size={20} />
        </button>
      </div>
      
      {/* Content */}
      <div className="p-6">
        {/* Error message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4 shadow-sm">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                </div>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Lỗi xảy ra</h3>
                <div className="mt-1 text-sm text-red-700">
                  {error}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Search and Controls */}
        <div className="flex flex-wrap items-center justify-between mb-4 gap-2">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 shadow-sm"
            >
              <PlusCircle size={16} className="mr-2" />
              Thêm thuốc mới
            </button>
            <button
              onClick={fetchMedicines}
              disabled={loading}
              className={`inline-flex items-center px-4 py-2 border text-sm font-medium rounded-md shadow-sm ${
                loading 
                  ? 'bg-gray-500 cursor-not-allowed text-gray-100 border-gray-500' 
                  : 'text-white bg-blue-600 hover:bg-blue-700 border-blue-600 hover:border-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
              }`}
            >
              <RefreshCw size={16} className={`mr-2 ${loading ? 'animate-spin' : ''}`} />
              Làm mới
            </button>
          </div>
          
          <div className="relative flex items-center">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-blue-600" />
            </div>
            <input
              type="text"
              placeholder="Tìm kiếm thuốc..."
              className="pl-10 pr-4 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm text-gray-800 bg-white"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setFilterEnabled(true);
              }}
            />
          </div>
        </div>
        
        {/* Add Medicine Form */}
        {showAddForm && (
          <div className="bg-blue-50 p-5 mb-4 border border-blue-200 rounded-lg shadow-inner">
            <h3 className="text-md font-medium mb-3 text-blue-900 flex items-center">
              <PlusCircle size={16} className="mr-2" />
              Thêm thuốc mới
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mã thuốc</label>
                <input
                  type="text"
                  value={newMedicine.customMedicineId}
                  onChange={(e) => setNewMedicine({...newMedicine, customMedicineId: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800"
                  placeholder="m123"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tên thuốc</label>
                <input
                  type="text"
                  value={newMedicine.name}
                  onChange={(e) => setNewMedicine({...newMedicine, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800"
                  placeholder="Paracetamol 500mg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Số lượng</label>
                <input
                  type="number"
                  value={newMedicine.totalPills}
                  onChange={(e) => setNewMedicine({...newMedicine, totalPills: parseInt(e.target.value) || 0})}
                  className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800"
                  placeholder="500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Đơn giá (VND)</label>
                <input
                  type="number"
                  step="0.01"
                  value={newMedicine.price}
                  onChange={(e) => setNewMedicine({...newMedicine, price: parseFloat(e.target.value) || 0})}
                  className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800"
                  placeholder="10000"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 pt-2">
              <button
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 border border-gray-400 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-sm"
              >
                Hủy
              </button>
              <button
                onClick={handleAddMedicine}
                disabled={loading}
                className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 shadow-sm"
              >
                {loading ? (
                  <>
                    <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2 inline-block"></span>
                    Đang xử lý...
                  </>
                ) : (
                  <>
                    <PlusCircle size={16} className="inline-block mr-1.5" />
                    Thêm thuốc
                  </>
                )}
              </button>
            </div>
          </div>
        )}
        
        {/* Medicines Table */}
        <div className="overflow-x-auto border border-gray-300 rounded-lg shadow-sm bg-white">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-blue-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-blue-800 uppercase tracking-wider">Mã thuốc</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-blue-800 uppercase tracking-wider">Tên thuốc</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-blue-800 uppercase tracking-wider">Số lượng</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-blue-800 uppercase tracking-wider">Đơn giá (VND)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-blue-800 uppercase tracking-wider">Thao tác</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading && filteredMedicines.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                        <RefreshCw size={24} className="animate-spin text-blue-600" />
                      </div>
                      <p className="text-blue-800 font-medium">Đang tải danh sách thuốc...</p>
                    </div>
                  </td>
                </tr>
              ) : filteredMedicines.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center">
                      {searchTerm ? (
                        <>
                          <Search size={32} className="text-gray-600 mb-2" />
                          <p className="text-gray-800 font-medium">Không tìm thấy thuốc phù hợp với từ khóa</p>
                        </>
                      ) : (
                        <>
                          <FileText size={32} className="text-gray-600 mb-2" />
                          <p className="text-gray-800 font-medium">Chưa có thuốc nào trong hệ thống</p>
                          <p className="text-gray-600 mt-1">Hãy thêm thuốc mới để bắt đầu</p>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                filteredMedicines.map((medicine) => (
                  <tr key={medicine._id} className="hover:bg-gray-50 transition-colors">
                    {editingMedicine && editingMedicine._id === medicine._id ? (
                      <>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            type="text"
                            value={editingMedicine.customMedicineId}
                            onChange={(e) => setEditingMedicine({...editingMedicine, customMedicineId: e.target.value})}
                            className="w-full px-2 py-1 border border-gray-400 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            type="text"
                            value={editingMedicine.name}
                            onChange={(e) => setEditingMedicine({...editingMedicine, name: e.target.value})}
                            className="w-full px-2 py-1 border border-gray-400 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            type="number"
                            value={editingMedicine.totalPills}
                            onChange={(e) => setEditingMedicine({...editingMedicine, totalPills: parseInt(e.target.value) || 0})}
                            className="w-full px-2 py-1 border border-gray-400 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            type="number"
                            step="0.01"
                            value={editingMedicine.price}
                            onChange={(e) => setEditingMedicine({...editingMedicine, price: parseFloat(e.target.value) || 0})}
                            className="w-full px-2 py-1 border border-gray-400 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex space-x-3">
                            <button
                              onClick={handleSaveEdit}
                              className="p-1 bg-green-100 text-green-700 hover:bg-green-200 rounded"
                              title="Lưu"
                            >
                              <Save size={18} />
                            </button>
                            <button
                              onClick={() => setEditingMedicine(null)}
                              className="p-1 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded"
                              title="Hủy"
                            >
                              <XCircle size={18} />
                            </button>
                          </div>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {medicine.customMedicineId}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          {medicine.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          {medicine.totalPills.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          {medicine.price.toLocaleString('vi-VN')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <div className="flex space-x-3">
                            <button
                              onClick={() => handleEditMedicine(medicine)}
                              className="p-1 bg-blue-100 text-blue-700 hover:bg-blue-200 rounded"
                              title="Sửa"
                            >
                              <Edit size={18} />
                            </button>
                            <button
                              onClick={() => medicine._id && handleDeleteMedicine(medicine._id)}
                              className="p-1 bg-red-100 text-red-700 hover:bg-red-200 rounded"
                              title="Xóa"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
