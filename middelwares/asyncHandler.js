const asyncHandler = (fn) => {
    // Hàm mũi tên (Arrow Function) / Hàm ẩn danh (Anonymous Function)
    return async (req, res, next) => {
        try {
            await fn(req, res, next)
        } catch (error) {
            return res.status(500).json({
                message: 'Lỗi máy chủ nội bộ',

                // Bao gồm thông tin lỗi để hỗ trợ quá trình gỡ lỗi (debug)

                // Có thể bổ sung thêm chi tiết lỗi tùy theo môi trường chạy ứng dụng
                error: process.env.NODE_ENV === 'development'
                    ? error
                    : undefined
            });
        }
    }
}

export default asyncHandler