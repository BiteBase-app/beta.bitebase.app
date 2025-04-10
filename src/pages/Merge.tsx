
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GitMerge, GitBranch, GitPullRequest, FileText, Code, Download, Upload, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Merge = () => {
  const { toast } = useToast();
  const [repoUrl, setRepoUrl] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [mergeComplete, setMergeComplete] = useState(false);

  const availableFiles = [
    { name: "src/components/", type: "directory", checked: false },
    { name: "src/hooks/", type: "directory", checked: false },
    { name: "src/pages/", type: "directory", checked: false },
    { name: "src/utils/", type: "directory", checked: false },
    { name: "public/assets/", type: "directory", checked: false },
    { name: "tailwind.config.js", type: "file", checked: false },
    { name: "package.json", type: "file", checked: false },
  ];

  const handleStartMerge = () => {
    if (!repoUrl) {
      toast({
        title: "Repository URL required",
        description: "Please enter a valid GitHub repository URL",
        variant: "destructive",
      });
      return;
    }
    
    if (selectedFiles.length === 0) {
      toast({
        title: "No files selected",
        description: "Please select at least one file or directory to merge",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      setMergeComplete(true);
      toast({
        title: "Merge complete",
        description: "Repository files have been successfully merged",
      });
    }, 3000);
  };

  const toggleFileSelection = (fileName: string) => {
    if (selectedFiles.includes(fileName)) {
      setSelectedFiles(selectedFiles.filter(f => f !== fileName));
    } else {
      setSelectedFiles([...selectedFiles, fileName]);
    }
  };

  return (
    <Layout>
      <div className="container py-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Repository Merge</h1>
            <p className="text-muted-foreground">Import components and files from external repositories.</p>
          </div>
          <Button variant="outline" className="mt-4 sm:mt-0">
            <FileText className="mr-2 h-4 w-4" /> View Docs
          </Button>
        </div>

        <Tabs defaultValue="merge" className="mt-6">
          <TabsList className="mb-4">
            <TabsTrigger value="merge">
              <GitMerge className="mr-2 h-4 w-4" /> Merge Repository
            </TabsTrigger>
            <TabsTrigger value="history">
              <GitBranch className="mr-2 h-4 w-4" /> Merge History
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Code className="mr-2 h-4 w-4" /> Integration Settings
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="merge">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle>Repository Details</CardTitle>
                  <CardDescription>Enter the GitHub repository you want to merge from</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="repo-url">Repository URL</Label>
                    <Input
                      id="repo-url"
                      placeholder="https://github.com/username/repo.git"
                      value={repoUrl}
                      onChange={(e) => setRepoUrl(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="branch">Branch</Label>
                    <Input
                      id="branch"
                      placeholder="main"
                      defaultValue="main"
                    />
                  </div>
                  <div className="pt-4">
                    <Button 
                      className="w-full" 
                      disabled={isProcessing || mergeComplete}
                      onClick={handleStartMerge}
                    >
                      {isProcessing ? (
                        <>Processing...</>
                      ) : mergeComplete ? (
                        <><Check className="mr-2 h-4 w-4" /> Merge Complete</>
                      ) : (
                        <><GitPullRequest className="mr-2 h-4 w-4" /> Start Merge</>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Select Files to Merge</CardTitle>
                  <CardDescription>Choose which files and directories to import</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {availableFiles.map((file) => (
                      <div 
                        key={file.name}
                        className="flex items-center p-3 rounded-md border hover:bg-muted/50 cursor-pointer"
                        onClick={() => toggleFileSelection(file.name)}
                      >
                        <input
                          type="checkbox"
                          className="mr-3 h-4 w-4"
                          checked={selectedFiles.includes(file.name)}
                          onChange={() => {}}
                        />
                        <div className="flex-1">
                          <p className="font-medium">{file.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {file.type === "directory" ? "Directory" : "File"}
                          </p>
                        </div>
                        {file.type === "directory" ? (
                          <Download className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <FileText className="h-4 w-4 text-muted-foreground" />
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="border-t bg-muted/50 flex justify-between">
                  <div className="text-sm text-muted-foreground">
                    {selectedFiles.length} items selected
                  </div>
                  <Button variant="outline" size="sm">
                    <Upload className="mr-2 h-4 w-4" /> Import All
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            {mergeComplete && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Merge Complete</CardTitle>
                  <CardDescription>The selected files have been successfully merged</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted p-4 rounded-md">
                    <pre className="text-sm">{`
Successfully merged ${selectedFiles.length} items from ${repoUrl}
                      
Items merged:
${selectedFiles.map(file => `- ${file}`).join('\n')}
                    `}</pre>
                  </div>
                </CardContent>
                <CardFooter className="gap-2">
                  <Button variant="outline">
                    View Changes
                  </Button>
                  <Button>
                    Continue to Dashboard
                  </Button>
                </CardFooter>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Merge History</CardTitle>
                <CardDescription>Recent repository merges and imports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-40 border border-dashed border-muted-foreground/25 rounded-lg">
                  <p className="text-muted-foreground text-center">Merge History<br/>Coming Soon</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Integration Settings</CardTitle>
                <CardDescription>Configure how repository merges are handled</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-40 border border-dashed border-muted-foreground/25 rounded-lg">
                  <p className="text-muted-foreground text-center">Integration Settings<br/>Coming Soon</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Merge;
