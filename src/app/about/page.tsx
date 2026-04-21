import Image from "next/image";
import Link from "next/link";

const values = [
  {
    icon: "🌿",
    title: "Tái chế từ bã cà phê",
    desc: " Được tạo ra từ bã cà phê đã qua sử dụng và được xử lý cẩn thận nhằm đảm bảo an toàn, chất lượng và tính bền vững — mang lại “vòng đời mới” cho nguồn nguyên liệu vốn bị xem là rác thải.",
  },
  {
    icon: "🌱",
    title: " Thân thiện môi trường & nguồn gốc thực vật",
    desc: " Sản phẩm được làm từ các vật liệu tự nhiên có nguồn gốc thực vật, bao gồm bã cà phê tái chế và các chất kết dính hữu cơ — hoàn toàn không chứa hóa chất độc hại.",
  },
  {
    icon: "♻️",
    title: " Sản xuất bền vững",
    desc: "Quy trình sản xuất xanh giúp giảm thiểu chất thải, hạn chế tác động đến môi trường và biến bã cà phê đã qua sử dụng thành những sản phẩm có giá trị, có thể tái sử dụng.",
  },
  {
    icon: "🌾",
    title: "Trách nhiệm với tự nhiên",
    desc: " Được tạo nên từ nguồn nguyên liệu cà phê tái chế và khai thác bền vững, kết hợp giữa đổi mới sáng tạo và trách nhiệm môi trường nhằm thúc đẩy mô hình kinh tế tuần hoàn.",
  },
];

const milestones = [
  { year: "2026", event: "CUPFFEE gia nhập thị trường Hà Nội với vai trò dự án thử nghiệm thị trường, ra mắt các dòng ly tái sử dụng, ứng dụng QR truy xuất nguồn gốc và kiểm chứng nhu cầu khách hàng cũng như khả năng hợp tác B2B." },
  { year: "2027", event: " CUPFFEE mở rộng ra ngoài Hà Nội, tiến vào TP. Hồ Chí Minh, tăng đơn hàng B2B và hoàn thiện mô hình vận hành với đối tác sản xuất để nâng cao khả năng mở rộng." },
  { year: "Giai đoạn 1 (Năm 1–3)", event: "Doanh nghiệp phát triển theo mô hình OEM, tập trung vào xây dựng thương hiệu, phát triển kênh bán hàng, thử nghiệm mạng lưới thu gom bã cà phê và kiểm chứng thị trường." },
  { year: "Giai đoạn 2 (Từ năm 4 trở đi)", event: "CUPFFEE từng bước phát triển năng lực R&D nội bộ, nghiên cứu vật liệu từ bã cà phê, đánh giá vòng đời sản phẩm và cải tiến thiết kế để tạo lợi thế cạnh tranh dài hạn." },
  { year: "2030", event: "Theo lộ trình 5 năm, CUPFFEE hướng đến mở rộng quy mô thị trường, tăng cường đổi mới vật liệu và tiến gần hơn đến mục tiêu trở thành doanh nghiệp nghiên cứu vật liệu bền vững." },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-[#3d1a08] py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#c8956c] rounded-full blur-3xl translate-x-1/3" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-[#c8956c] font-semibold text-sm uppercase tracking-widest">
                Câu Chuyện Của Chúng Tôi
              </span>
              <h1 className="text-5xl lg:text-6xl font-bold text-white mt-3 mb-6">
                Về CUPFFEE
              </h1>
              <p className="text-[#c8956c] text-lg leading-relaxed mb-6">
                Cupffee mang đến một cách tiếp cận thông minh và có trách nhiệm hơn trong việc thưởng thức đồ uống, đồng 
                thời bảo vệ môi trường. Thay vì tạo thêm rác thải, chúng tôi tận dụng bã cà phê đã qua sử dụng để sản xuất 
                những chiếc cốc bền chắc, thân thiện với môi trường.
              </p>
              <p className="text-[#c8956c]/80 leading-relaxed">
                Sứ mệnh của chúng tôi là giải quyết các vấn đề môi trường cấp bách như ô nhiễm nhựa, lượng rác thải lớn từ 
                ngành F&B và việc sử dụng tài nguyên chưa hiệu quả. Bằng cách “tái sinh” bã cà phê, chúng tôi góp phần thúc 
                đẩy mô hình kinh tế tuần hoàn — nơi tài nguyên được tái sử dụng thay vì bị loại bỏ.

                Được thiết kế để vừa tiện lợi vừa bền vững, cốc Cupffee có độ bền cao, an toàn và phù hợp cho cả đồ uống nóng 
                lẫn lạnh mà không cần lớp phủ nhựa hay hóa chất độc hại.
              </p>
            </div>
            <div className="flex justify-center lg:justify-end">
              <Image
                src="/CUPFFEE.png"
                alt="Cupffee"
                width={1024}
                height={1024}
                className="w-56 h-56 lg:w-64 lg:h-64 object-contain object-bottom opacity-90"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#6d3018] font-semibold text-sm uppercase tracking-widest">
              Sứ Mệnh
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => (
              <div
                key={i}
                className="bg-[#f6ece0] rounded-2xl p-6 text-center hover:shadow-md transition-shadow"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="font-bold text-[#3d1a08] mb-2">{value.title}</h3>
                <p className="text-[#6d3018]/70 text-sm leading-relaxed">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#f6ece0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#6d3018] font-semibold text-sm uppercase tracking-widest">
              Hành Trình
            </span>
            <h2 className="text-4xl font-bold text-[#3d1a08] mt-3">
              Câu Chuyện CUPFFEE
            </h2>
          </div>

          <div className="relative max-w-3xl mx-auto">
            <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-[#6d3018]/20" />

            {milestones.map((m, i) => (
              <div
                key={i}
                className={`relative flex items-center gap-8 mb-8 ${
                  i % 2 === 0 ? "sm:flex-row-reverse" : ""
                }`}
              >
                <div className="absolute left-4 sm:left-1/2 w-4 h-4 bg-[#6d3018] rounded-full -translate-x-1/2 flex-shrink-0 border-4 border-[#f6ece0]" />
                <div
                  className={`pl-12 sm:pl-0 w-full sm:w-[calc(50%-2rem)] ${
                    i % 2 === 0 ? "sm:pr-8 sm:text-right" : "sm:pl-8"
                  }`}
                >
                  <div className="bg-white rounded-2xl p-5 border border-[#e8d5c0] hover:shadow-md transition-shadow">
                    <div className="text-[#6d3018] font-bold text-lg mb-1">
                      {m.year}
                    </div>
                    <p className="text-[#3d1a08] text-sm">{m.event}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#6d3018]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { num: "7", label: "Thành Phần Tự Nhiên" },
              { num: "55+", label: "Quốc Gia" },
              { num: "353+", label: "Khách Hàng" },
              { num: "277K kg", label: "CO₂ Được Giảm Thiểu" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl lg:text-5xl font-bold text-white mb-2">
                  {stat.num}
                </div>
                <div className="text-[#c8956c] text-sm font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-[#3d1a08] mb-4">
            Tham Gia Cùng Chúng Tôi
          </h2>
          <p className="text-[#6d3018]/70 text-lg mb-8">
            Trở thành một phần của phong trào thay đổi cách thế giới thưởng thức
            cà phê.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="bg-[#6d3018] text-[#f6ece0] px-8 py-4 rounded-full font-bold hover:bg-[#8b4513] transition-colors text-lg"
            >
              Mua Sản Phẩm
            </Link>
            <Link
              href="/contact"
              className="border-2 border-[#6d3018] text-[#6d3018] px-8 py-4 rounded-full font-bold hover:bg-[#6d3018] hover:text-[#f6ece0] transition-colors text-lg"
            >
              Liên Hệ
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
