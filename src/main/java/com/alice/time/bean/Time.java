package com.alice.time.bean;

public class Time {

	private String timeId;
	private String timeName;
	private String timeExpireDate;
	private String timeSlogan;
	private String timeType;
	private String timeStatus;
	private String cycleDate;
	private String cycleType;
	private String warnDate;
	private String warnType;
	private String importance;
	private String userId;
	private String sort;
	private String timeUuid;
	private String createUserId;
	private String createDate;
	private String updateUserId;
	private String updateDate;
	private String valid;
	//100为目标模式 200为节日模式 300为活动模式
	private String timeMode;
	//剩余的倒计时的毫秒数
	private String remainCountDownTime;
	//总的倒计时毫秒数
	private String totalCountDownTime;
	
	public String getTimeId() {
		return timeId;
	}
	public void setTimeId(String timeId) {
		this.timeId = timeId;
	}
	public String getTimeName() {
		return timeName;
	}
	public void setTimeName(String timeName) {
		this.timeName = timeName;
	}
	public String getTimeExpireDate() {
		return timeExpireDate;
	}
	public void setTimeExpireDate(String timeExpireDate) {
		this.timeExpireDate = timeExpireDate;
	}
	public String getTimeSlogan() {
		return timeSlogan;
	}
	public void setTimeSlogan(String timeSlogan) {
		this.timeSlogan = timeSlogan;
	}
	public String getTimeType() {
		return timeType;
	}
	public void setTimeType(String timeType) {
		this.timeType = timeType;
	}
	public String getTimeStatus() {
		return timeStatus;
	}
	public void setTimeStatus(String timeStatus) {
		this.timeStatus = timeStatus;
	}
	public String getCycleDate() {
		return cycleDate;
	}
	public void setCycleDate(String cycleDate) {
		this.cycleDate = cycleDate;
	}
	public String getCycleType() {
		return cycleType;
	}
	public void setCycleType(String cycleType) {
		this.cycleType = cycleType;
	}
	public String getWarnDate() {
		return warnDate;
	}
	public void setWarnDate(String warnDate) {
		this.warnDate = warnDate;
	}
	public String getWarnType() {
		return warnType;
	}
	public void setWarnType(String warnType) {
		this.warnType = warnType;
	}
	public String getImportance() {
		return importance;
	}
	public void setImportance(String importance) {
		this.importance = importance;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getSort() {
		return sort;
	}
	public void setSort(String sort) {
		this.sort = sort;
	}
	public String getTimeUuid() {
		return timeUuid;
	}
	public void setTimeUuid(String timeUuid) {
		this.timeUuid = timeUuid;
	}
	public String getCreateUserId() {
		return createUserId;
	}
	public void setCreateUserId(String createUserId) {
		this.createUserId = createUserId;
	}
	public String getCreateDate() {
		return createDate;
	}
	public void setCreateDate(String createDate) {
		this.createDate = createDate;
	}
	public String getUpdateUserId() {
		return updateUserId;
	}
	public void setUpdateUserId(String updateUserId) {
		this.updateUserId = updateUserId;
	}
	public String getUpdateDate() {
		return updateDate;
	}
	public void setUpdateDate(String updateDate) {
		this.updateDate = updateDate;
	}
	public String getValid() {
		return valid;
	}
	public void setValid(String valid) {
		this.valid = valid;
	}
	public String getTimeMode() {
		return timeMode;
	}
	public void setTimeMode(String timeMode) {
		this.timeMode = timeMode;
	}
	public String getRemainCountDownTime() {
		return remainCountDownTime;
	}
	public void setRemainCountDownTime(String remainCountDownTime) {
		this.remainCountDownTime = remainCountDownTime;
	}
	public String getTotalCountDownTime() {
		return totalCountDownTime;
	}
	public void setTotalCountDownTime(String totalCountDownTime) {
		this.totalCountDownTime = totalCountDownTime;
	}
}
