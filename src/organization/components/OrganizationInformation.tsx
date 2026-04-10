import { createPortal } from 'react-dom';
import { useModal } from '../../common/contexts/ModalContext';
import type { Organization } from '../interfaces/Organization';
import { useNavigate } from 'react-router-dom';
import { useOrganizationChildren } from '../hooks/Organizations/useOrganizationChildren';

export const OrganizationInformation = () => {
  const navigate = useNavigate();
  const { modalStack, closeModal } = useModal();
  const currentModal = modalStack[modalStack.length - 1];
  const organization = currentModal?.data as Organization | undefined;

  const isOpen =
    currentModal && currentModal.name === 'OrganizationInformation';

  const { organizations } = useOrganizationChildren(
    isOpen && organization ? organization.id : undefined,
  );

  if (!isOpen || !organization) return null;
  return createPortal(
    <>
      <div
        onClick={closeModal}
        className="fixed inset-0 duration-500 transform transition-transform bg-stone-300/30 backdrop-blur-sm flex items-center justify-center">
        <div
          className="bg-white p-4 rounded w-[90%] max-w-2xl max-h-[90vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center justify-between p-2 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">
              {organization.organizationName}
            </h2>
            <button
              onClick={closeModal}
              className="text-gray-400 hover:text-gray-600 transition-colors">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="m-4 p-6 overflow-y-auto flex-1">
            <div className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">Cấp quản lý</p>
                  <p className="text-gray-800 font-medium">
                    {organization.managementLevel}
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">Số điện thoại </p>
                  <p className="text-gray-800 font-medium">
                    {organization.phoneNumber}
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">Email </p>
                  <p className="text-gray-800 font-medium">
                    {organization.email}
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">Địa chỉ </p>
                  <p className="text-gray-800 font-medium">
                    {organization.address.detailedAddress}{' '}
                    {organization.address.commune.name},
                  </p>
                  <p className="text-gray-800 font-medium">
                    {organization.address.province.name}
                  </p>
                </div>
                {organizations.length !== 0 ? (
                  <div className="bg-gray-50 p-4 rounded-lg md:col-span-2">
                    <p className="text-sm text-gray-500 mb-2">
                      Tổ chức trực thuộc
                    </p>

                    <div className="grid grid-cols-4 gap-3">
                      {organizations?.map((org) => (
                        <div
                          key={org.id}
                          className="border rounded-lg p-3 bg-white shadow-sm">
                          <p className="font-medium text-gray-800">
                            {org.organizationName}
                          </p>
                          <p className="text-xs text-gray-500">
                            {org.managementLevel}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          {/* Footer */}
          <div className="flex justify-end gap-3 p-6 border-t border-gray-200 ">
            <button
              onClick={closeModal}
              className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              Đóng
            </button>
            <button
              onClick={() => {
                navigate(`/organizations/update/${organization.id}`);
              }}
              className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
              Chỉnh sửa
            </button>
          </div>
        </div>
      </div>
    </>,
    document.body,
  );
};
