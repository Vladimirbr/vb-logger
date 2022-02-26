/**
 * Module dependencies.
 */
import winston, { createLogger, format, transports } from 'winston';
const { combine, splat, timestamp, printf, label, json, prettyPrint, colorize } = format;

import { ILog } from './interfaces/log';
import { IConfig } from './interfaces/config';

/**
 * @class Logger - representing a logger, implement log interface
 *
 * {@link ILog}
 * {@link IConfig}
 *
 */
class Logger implements ILog {
	/** The logger instance
	 *
	 * @readonly
	 * @private winston logger instance
	 */
	private readonly logger: winston.Logger;

	/**
	 * @constructor Create a logger
	 *
	 * @param loggerConfig - The logger configurations
	 *
	 */
	constructor(loggerConfig: IConfig) {
		this.logger = createLogger({
			level: loggerConfig.MIN_LEVEL_CONSOLE,
			exitOnError: loggerConfig.EXIT_ON_ERROR,
			handleExceptions: loggerConfig.HANDLE_EXCEPTIONS,
			format: combine(
				label({ label: loggerConfig.LABEL }),
				splat(),
				prettyPrint(),
				json(),
				format.simple(),
				timestamp({
					format: loggerConfig.TIMESTAMP_FORMAT,
				}),
				this.myFormat,
			),
			transports: [new transports.Console({ format: colorize() })],
		});
	}

	/**
	 * Public function that print log in level debug
	 *
	 * Basic usage example:
	 *
	 *  ```ts
	 *
	 *  logger.debug('my debug msg', {})
	 *  ```
	 *
	 * @param msg:string - The log message
	 * @param data - The additional log data for print, json in most cases
	 */
	public debug(msg: string, ...data: any[]): void {
		this.emitLofMessage('debug', msg, data);
	}

	/**
	 * Public function that print log in level error
	 *
	 * Basic usage example:
	 *
	 *  ```ts
	 *
	 *  logger.debug('my error msg', {})
	 *  ```
	 *
	 * @param msg:string - The log message
	 * @param data - The additional log data for print, json in most cases
	 */
	public error(msg: string, ...data: any[]): void {
		this.emitLofMessage('error', msg, data);
	}

	/**
	 * Public function that print log in level http
	 *
	 * Basic usage example:
	 *
	 *  ```ts
	 *
	 *  logger.debug('my http msg', {})
	 *  ```
	 *
	 * @param msg:string - The log message
	 * @param data - The additional log data for print, json in most cases
	 */
	public http(msg: string, ...data: any[]): void {
		this.emitLofMessage('http', msg, data);
	}

	/**
	 * Public function that print log in level info
	 *
	 * Basic usage example:
	 *
	 *  ```ts
	 *
	 *  logger.debug('my info msg', {})
	 *  ```
	 *
	 * @param msg:string - The log message
	 * @param data - The additional log data for print, json in most cases
	 */
	public info(msg: string, ...data: any[]): void {
		this.emitLofMessage('info', msg, data);
	}

	/**
	 * Public function that print log in level silly
	 *
	 * Basic usage example:
	 *
	 *  ```ts
	 *
	 *  logger.debug('my silly msg', {})
	 *  ```
	 *
	 * @param msg:string - The log message
	 * @param data - The additional log data for print, json in most cases
	 */
	public silly(msg: string, ...data: any[]): void {
		this.emitLofMessage('silly', msg, data);
	}

	/**
	 * Public function that print log in level verbose
	 *
	 * Basic usage example:
	 *
	 *  ```ts
	 *
	 *  logger.debug('my verbose msg', {})
	 *  ```
	 *
	 * @param msg:string - The log message
	 * @param data - The additional log data for print, json in most cases
	 */
	public verbose(msg: string, ...data: any[]): void {
		this.emitLofMessage('verbose', msg, data);
	}

	/**
	 * Public function that print log in level warning
	 *
	 * Basic usage example:
	 *
	 *  ```ts
	 *
	 *  logger.debug('my warning msg', {})
	 *  ```
	 *
	 * @param msg:string - The log message
	 * @param data - The additional log data for print, json in most cases
	 */
	public warn(msg: string, ...data: any[]): void {
		this.emitLofMessage('warn', msg, data);
	}

	/**
	 * Private function that log all data
	 *
	 * @private
	 * @param msgType - The logger level
	 * @param msg:string - The log message
	 * @param data - The additional log data for print, json in most cases
	 */
	private emitLofMessage(msgType: string, msg: string, data: any[]) {
		this.logger.log(msgType, msg, data);
	}

	/**
	 * Private function for formatting log message using winston printf method
	 * @private
	 * @return msg - The formatted log message
	 */
	private myFormat = printf(({ level, message, label, timestamp, ...metadata }): string => {
		let msg = `${timestamp} | [pid: ${process.pid}] | [${label}] - [${level}] : ${message} `;
		if (metadata && Object.keys(metadata).length !== 0) {
			msg += JSON.stringify(metadata);
		}
		return msg;
	});
}

export default Logger;
