package com.alice.time.utils;

import java.text.SimpleDateFormat;
import java.util.Date;

import com.alice.time.enumhouse.DateFormatEnum;

public class DateUtil {

	public static String getCurrentDate(DateFormatEnum format){
		SimpleDateFormat sdf = new SimpleDateFormat(format.getFormat());
		return sdf.format(new Date());
	}
	
//	public static Date formatStringToDate(String date, DateFormatEnum format){
//		
//	}
//	
//	  //** 
////  * 增加日期中某类型的某数值。如增加日期 
////  * @param date 日期字符串 
////  * @param dateType 类型 
////  * @param amount 数值 
////  * @return 计算后日期字符串 
////  */
// private static String addTime(String date, int dateType, int value) {  
//     String dateString = null;  
//     DateStyle dateStyle = getDateStyle(date);  
//     if (dateStyle != null) {  
//         Date myDate = StringToDate(date, dateStyle);  
//         myDate = addInteger(myDate, dateType, amount);  
//         dateString = DateToString(myDate, dateStyle);  
//     }  
//     return dateString;  
// }  
	
	//工具测试方法
	public static void main(String[] args) {
		String date = DateUtil.getCurrentDate(DateFormatEnum.YYYYMMDDHHMMSS);
		System.out.println(date);
	}
	
	/** 
     * 增加日期的年份。失败返回null。 
     * @param date 日期 
     * @param yearAmount 增加数量。可为负数 
     * @return 增加年份后的日期字符串 
     */  
//    public static String addYear(String date, int yearAmount) {  
//        return addInteger(date, Calendar.YEAR, yearAmount);  
//    }  
//    
//    /** 
//     * 增加日期的月份。失败返回null。 
//     * @param date 日期 
//     * @param yearAmount 增加数量。可为负数 
//     * @return 增加月份后的日期字符串 
//     */  
//    public static String addMonth(String date, int yearAmount) {  
//        return addInteger(date, Calendar.MONTH, yearAmount);  
//    }  
//    
//    /** 
//     * 增加日期的天数。失败返回null。 
//     * @param date 日期字符串 
//     * @param dayAmount 增加数量。可为负数 
//     * @return 增加天数后的日期字符串 
//     */  
//    public static String addDay(String date, int dayAmount) {  
//        return addInteger(date, Calendar.DATE, dayAmount);  
//    }  
//    
//    /** 
//     * 增加日期的小时。失败返回null。 
//     * @param date 日期字符串 
//     * @param dayAmount 增加数量。可为负数 
//     * @return 增加小时后的日期字符串 
//     */  
//    public static String addHour(String date, int hourAmount) {  
//        return addInteger(date, Calendar.HOUR_OF_DAY, hourAmount);  
//    }  
//    
//    /** 
//     * 增加日期的分钟。失败返回null。 
//     * @param date 日期字符串 
//     * @param dayAmount 增加数量。可为负数 
//     * @return 增加分钟后的日期字符串 
//     */  
//    public static String addMinute(String date, int hourAmount) {  
//        return addInteger(date, Calendar.MINUTE, hourAmount);  
//    }  
//    
}
