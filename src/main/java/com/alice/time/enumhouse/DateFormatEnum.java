package com.alice.time.enumhouse;

public enum DateFormatEnum {
	
	YYYY("yyyy"), YYYYMM("yyyy-MM"), YYYYMMDD("yyyy-MM-dd"), YYYYMMDDHH("yyyy-MM-dd HH"), YYYYMMDDHHMM("yyyy-MM-dd HH:mm"), YYYYMMDDHHMMSS("yyyy-MM-dd HH:mm:ss");  

	private DateFormatEnum(String format) {
        this.format = format;
    }

	private String format;

	public String getFormat() {
		return format;
	}

	public void setFormat(String format) {
		this.format = format;
	}
	
	
}
