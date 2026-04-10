import { useState } from 'react';
import { useBeneficiaries } from '../hooks/useBeneficiaries';
import { GoPencil, GoTrash } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';
import { useModal } from '../../common/contexts/ModalContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../common/api/api';

export const SupportTable = () => {
  const navigate = useNavigate();

  const { data: beneficiaries } = useBeneficiaries();

  const [selectedId, setSelectedId] = useState<number | null>(null);

  const selected = beneficiaries?.find((b) => b.id === selectedId);
  const { openModal } = useModal();
  const queryClient = useQueryClient();

  const deleteBeneficiary = useMutation({
    mutationFn: (id: number) => api.delete(`beneficiaries/${id}`),
    onSuccess: (res) => {
      openModal('CONFIRM', {
        title: 'Thông báo',
        message: res.data.data,
        type: res.data.type,
      });
      queryClient.invalidateQueries({
        queryKey: ['beneficiaries'],
      });
    },
    onError: () => {
      openModal('CONFIRM', {
        title: 'Lỗi',
        message: 'Không thể xóa đối tượng',
        type: 'ERROR',
      });
    },
  });
  return (
    <div className="flex h-full rounded-xl overflow-hidden">
      <div className="w-1/5 border-r border-gray-300  overflow-y-auto">
        {beneficiaries?.map((b) => (
          <div
            key={b.id}
            onClick={() => setSelectedId(b.id)}
            className={`flex justify-between p-4 cursor-pointer hover:bg-gray-100 border-t border-gray-300 transition ${
              selected?.id === b.id ? 'bg-blue-50' : ''
            }`}>
            <div className="font-semibold">{b.name}</div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/supports/update/${b.id}`);
              }}
              className="hover:text-white hover:bg-blue-500 transition-colors rounded cursor-pointer p-1">
              <GoPencil className="size-5" />
            </button>

            <button
              onClick={() =>
                openModal('CONFIRM', {
                  title: 'Xóa dữ liệu năm học !',
                  message: 'Bạn có chắc chắn muốn xóa?',
                  type: 'DELETE',
                  onConfirm: () => deleteBeneficiary.mutate(b.id),
                })
              }
              className={
                'p-1 rounded transition-colors hover:text-white hover:bg-red-500'
              }>
              <GoTrash className="size-5" />
            </button>
          </div>
        ))}
      </div>

      <div className="w-4/5 p-6">
        {!selected ? (
          null
        ) : (
          <>
            <h2 className="text-xl font-bold mb-2">{selected.name}</h2>
            <p className="text-gray-600 mb-6">{selected.description}</p>

            <div className=" rounded-lg overflow-hidden">
              <div className="grid grid-cols-3 p-3 font-semibold">
                <div>Name</div>
                <div>Type</div>
                <div className="text-center">Value</div>
              </div>

              {selected.supportPolicyResponse?.length ? (
                selected.supportPolicyResponse.map((p) => (
                  <div
                    key={p.id}
                    className="grid grid-cols-3 p-3 border-t border-gray-300">
                    <div>{p.name}</div>
                    <div>{p.type}</div>
                    <div className="grid grid-cols-2">
                      <div>
                        {p.percentage != null
                          ? `Percentage: ${p.percentage}%`
                          : 'Percentage: -'}
                      </div>
                      <div>
                        {p.amount != null
                          ? `Amount: ${p.amount} VND`
                          : 'Amount: -'}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 text-gray-400">Không có policy</div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
