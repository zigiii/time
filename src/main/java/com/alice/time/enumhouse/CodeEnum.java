package com.alice.time.enumhouse;

public enum CodeEnum {
	
	SUCCESS("0"), FAILURE("18");  

	private CodeEnum(String code) {
        this.code = code;
    }

	private String code;

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

}
