const fs = require("fs");
const { parse } = require("csv-parse");

fs.createReadStream("./migration_data.csv")
  .pipe(parse({columns: true}))
  .on("data", function (row) {
    if ((row['Airline'] === 'VN' || row['Airline'] === 'QH') && row['From date'] === '06/01/2023') {
      const data = JSON.parse(fs.readFileSync('fare.json'));
      data.push({
        "airline": row['Airline'],
        "allowance_baggage_note": row['Ghi chú HLKG'],
        "allowance_baggage_quantity": row['Số kiện ký gửi'],
        "allowance_baggage_weight": row['Số kg/kiện ký gửi'],
        "baggage_quantity": row['Số kiện xách tay'],
        "baggage_weight": row['Số kg/kiện xách tay'],
        "cabin": row['Cabin'],
        "cancel_fee": row['Hoàn vé - Timeframe 1 - From'],
        "class": row['Class'],
        "detail_en": row['Detail_En'],
        "detail_vi": row['Detail_Vi'],
        "expired_time_refund": row['Hạn sử dụng'],
        "fee_drop_out_route": row['Phí bỏ chuyến'],
        "fee_update_route_at_airport":row['Phí đổi chuyến tại sân bay'],
        "from_date": row['From date'],
        "has_business_room": row['Phòng chờ thương gia'],
        "has_plus_point": row['Hệ số cộng điểm'],
        "has_priority_counters": row['Quầy thủ tục ưu tiên'],
        "id": row['Id'],
        "is_allowance_baggage": row['Có hành lý ký gửi?'],
        "is_baggage": row['Có hành lý xách tay?'],
        "is_drop_out_route": row['Hỗ trợ khách bỏ chuyến?'],
        "is_meal": row['Có bữa ăn?'],
        "is_refund_1": row['Hỗ trợ hoàn 1?'],
        "is_refund_2": row['Hỗ trợ hoàn 2?'],
        "is_select_seat": row['Chọn chỗ ngồi'],
        "is_update_name": row['Hỗ trợ đổi tên'],
        "is_update_route_at_airport": row['Hỗ trợ đổi chuyến tại sân bay?'],
        "is_update_ticket_1": row['Hỗ trợ đổi 1?'],
        "is_update_ticket_2": row['Hỗ trợ đổi 2?'],
        "meal_duration": row['Áp dụng với chuyến bay từ'],
        "operating_airline": row['Operated Airlines'],
        "reason_refund_1": row['Lý do hoàn 1'],
        "reason_refund_2": row['Lý do hoàn 2'],
        "refund_fee_1": row['Phí hoàn 1'],
        "refund_fee_2": row['Phí hoàn 2'],
        "refund_method": row['Hình thức hoàn (nếu có)'],
        "seat_class": row['Hạng ghế'],
        "time_from_refund": row['Hoàn vé - Timeframe 1 - From'],
        "time_from_refund_2": row['Hoàn vé - Timeframe 2 - From'],
        "time_from_update_1": row['Đổi vé - Timeframe 1 - From'],
        "time_from_update_2": row['Đổi vé - Timeframe 2 - From'],
        "time_to_refund": row['Hoàn vé - Timeframe 1 - To'],
        "time_to_refund_2": row['Hoàn vé - Timeframe 2 - To'],
        "time_to_update_1": row['Đổi vé - Timeframe 1 - To'],
        "time_to_update_2": row['Đổi vé - Timeframe 2 - To'],
        "to_date": row['To date'],
        "update_fee_1": row['Phí đổi 1'],
        "update_fee_2": row['Phí đổi 2'],
        "update_name": row['Hỗ trợ đổi tên'],
        "update_name_fee": row['Phí đổi tên'],
        "update_name_from": row['Đổi tên - From'],
        "update_name_to": row['Đổi tên - To'],
        "update_route_at_airport": row['Hỗ trợ đổi chuyến tại sân bay?']
      })
      console.log(data);
      fs.writeFileSync('fare.json', JSON.stringify(data));
    }
  });