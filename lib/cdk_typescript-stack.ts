import * as cdk from 'aws-cdk-lib';
import {Construct} from 'constructs';
import {CreateBucketCommand} from "@aws-sdk/client-s3";
import {CreateFunctionCommand, LambdaClient} from "@aws-sdk/client-lambda";
import {AttributeType, BillingMode, Table} from "aws-cdk-lib/aws-dynamodb";
import {LambdaIntegration, RestApi} from "aws-cdk-lib/aws-apigateway";
import {NodejsFunction} from "aws-cdk-lib/aws-lambda-nodejs";
import {command} from "aws-cdk/lib/commands/docs";
import {Runtime} from "node:inspector";
import {WebSocketLambdaIntegration} from "aws-cdk-lib/aws-apigatewayv2-integrations";

export class CdkTypescriptStack extends cdk.Stack {
  private PDFDevDemo2: any;
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // example resource
    /*const queue = new sqs.Queue(this, 'CdkTypescriptQueue', {
    visibilityTimeout: cdk.Duration.seconds(300)
     });*/

    const createBucket = async () => {
      try {
        const command = new CreateBucketCommand({
          Bucket: "pdf-demo1-softuni-bucket33", // Replace with your bucket name
        });

        const response = await client.send(command);
        console.log("Bucket created successfully:", response.$metadata);
      } catch (error) {
        console.error("Error creating bucket:", error);
      }
    };
    createBucket();

    const PDFDataLogDemo1 = new Table(this, 'PDFDatalogFDemo1', {
      partitionKey:{
        name: "id",
        type: AttributeType.STRING
      }, billingMode: BillingMode.PAY_PER_REQUEST
    });



    //Create Lambda function
    const processPdf = new NodejsFunction(this, "processPdf", {
      description: "Demo exam",
      entry: `${__dirname}/../src/PDFProcessFunction.ts`,
      handler: "handler",
      runtime: Runtime.NODEJS_22_X,
    });

    // Create rest app
    const PDFDevDemo2 = new RestApi(this, 'processFilesApi');
    const resource = this.PDFDevDemo2.root.addResource('processorJSON');
    resource.addMethod('POST', new LambdaIntegration(processPdf));

    const client = new LambdaClient();
        const response = await client.send(command);
        console.log("Lambda function created successfully:", response);

  }
}
